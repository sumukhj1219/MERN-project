const asyncHandler = (fn) => async(res, req, next) =>{
	try {
		await fn(res, req, next);
	} catch (error) {
		res.status(500).json({
			sucess: false,
			message: error.message
		})
	}
}

export {asyncHandler}