import { deleteFile } from '@_lib/middleware/delete-file';
import { uploadSingleFile } from '@_lib/middleware/upload-file-only';
import express from 'express';

export default (router: express.Router) => {
    router.post(
        "/common/upload-file",
        uploadSingleFile,
        (req, res) => {
            res.json({
                success: true,
                message: "Successfully upload file",
                data: {
                    public_id: req.body.public_id,
                }
            });
        }
    );
    router.delete(
        "/common/file",
        deleteFile,
        (req, res) => {
            res.json({
                message: "Successfully delete file",
                success: true,
                data : null
            });
        }
    );
};