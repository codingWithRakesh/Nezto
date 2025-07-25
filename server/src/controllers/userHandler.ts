import { Request, Response } from 'express';
import { User } from '@/models/User';
import { ApiResponse } from '@utils/helpers';



interface UpdateUserRequest {
    name?: string;
    picture?: string;
    location?: string;
    role?: string;
}

 /**Get all users
 * @route GET /api/users
 * @access Admin only
 */
export async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await User.find({}).select('-token');

        res.handler.success(res, {
            users, count: users.length, message: 'Users fetched successfully'
        });

    } catch (error: any) {
        res.app.nezto.logger.error('Error fetching users:', error);
        res.handler.internalServerError(res, { message: 'Failed to fetch user', error: error.message });
    }
}



/**
 * @description Get user by ID
 * @route GET /api/users/:id
 * @access User level operation
 */
export async function getUserById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('-token');
        if (!user) {
            res.status(404).json(new ApiResponse(404, {}, 'User not found'));
        }
        res.status(200).json(new ApiResponse(200, { user }, 'User fetched successfully'));
    } catch (error: any) {
        console.error('Error fetching user:', error);
        res.handler.internalServerError(res, {message : 'Failed to fetch user', error : error.message});
    }
}

/**Update user by ID
 * @route PATCH /api/users/:id
 * @access User level operation
 */
export async function updateUserById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { name, picture, location, role } = req.body;

        // Find the user first to check if it exists
        const existingUser = await User.findById(id);

        if (!existingUser) {
            res.status(404).json(new ApiResponse(404, {}, 'User not found'));
        }

        // Create update object with only provided fields
        const updateData: UpdateUserRequest = {};
        if (name) updateData.name = name;
        if (picture) updateData.picture = picture;
        if (location) updateData.location = location;
        if (role) updateData.role = role;

        // Update user with new data
        const updatedUser = await User.findByIdAndUpdate(
            id, { $set: updateData },
            { new: true, runValidators: true },
        ).select('-token');

        res
            .status(200)
            .json(new ApiResponse(200, { user: updatedUser }, 'User updated successfully'));

    }

    catch (error: any) {
        console.error('Error updating user:', error);
        res.status(500).json(new ApiResponse(500, {}, 'Failed to update user', error.message));
    }
}



/**Delete user by ID
 * @route DELETE /api/users/:id
 * @access Admin only
 */
export async function deleteUserById(req: Request, res: Response) {
    try {
        const { id } = req.params;

        // Find and delete the user
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            res.status(404).json(new ApiResponse(404, {}, 'User not found'));
        }

        res.status(200).json(new ApiResponse(200, {}, 'User deleted successfully'));
    }

    catch (error: any) {
        console.error('Error deleting user:', error);
        res.status(500).json(new ApiResponse(500, {}, 'Failed to delete user', error.message));
    }
}
