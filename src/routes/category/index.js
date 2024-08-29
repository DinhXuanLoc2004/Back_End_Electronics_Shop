const express = require('express')
const router = express.Router()
const CategoryController = require('../../controllers/category.controller')
const { asyncHandler } = require('../../helpers/handError')
const { upload, handleUploadSingleImage, handleUploadImagesCategory } = require('../../configs/uploadFile')
const { verifyUser, isAdmin } = require('../../middleware/auth.middleware')

router.post('', upload.array(['thumb']), handleUploadImagesCategory, asyncHandler(CategoryController.addNewCategory))
router.get('', /*verifyUser,*/ asyncHandler(CategoryController.getAllCategories))
router.put('/:categoryId', /*[verifyUser, isAdmin],*/ asyncHandler(CategoryController.updateCategory))
router.delete('/:categoryId', asyncHandler(CategoryController.deleteCategory))

module.exports = router