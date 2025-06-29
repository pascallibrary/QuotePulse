const Users = require('./models/User');

const getUserProfile = async (req, res, next) => {
    if (!req.user) {
        return res.status(404).json({ status: 'error', message: 'User not found' })
    }

    // User object already excludes passwords 
    res.status(200).json({
        status: 'success',
        data: req.user,
    })
}

const updateUserProfile = async (req, res, next) => {
    const { subscribed, preferredCategories } = req.body;

    if (!req.user) {
        return res.status(404).json({ status: 'error', message: 'User not found' })
    }

    try {
        const user = await User.findById(req.user._id);

        if (user) {
            // update subscription status if needed

            if (typeof subscribed === 'boolean') {
                user.subscribed = subscribed;
            }
        }

        // Update preferred categories if provided and valid
        if (Array.isArray(preferredCategories) && preferredCategories.length > 0) {
            const validCategories = user.schema.path('preferredCategories').caster.enum;
            const invalidCategories = preferredCategories.filter(
                (cat) => !validCategories.includes(cat)
            );

        
        if (invalidCategories.length > 0) {
            return res.status(400).json({
                status: 'error',
                message: `Invalid categories provided: ${invalidCategories.join(',')}. Allowed are: ${validCategories.join(',')}`
            })
        }
         user.preferredCategories = preferredCategories;
    } else if (Array.isArray(preferredCategories) && preferredCategories.length === 0) {

        user.preferredCategories = preferredCategories;
    

    await user.save(); 

    res.status(200).json({
        status: 'success',
        message: 'User profile updated successfully',
        data: user,
    });

} else  {
    res.status(404).json({ status: 'error', message: 'User not found'})
}

} catch (error) {
    if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(val => val.message);
        return res.status(400).json({ status: 'error', message: messages.join(',') })
    }

    console.error('Update profile error:', error.message);
    res.status(500).json({ status: 'error', message: 'Server error during profile update' });
} 

}

module.exports = { getUserProfile, updateUserProfile }
