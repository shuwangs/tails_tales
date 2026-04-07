import titleGenerator from "../utils/titleGenerator.js";
export const suggestTitles = async (req, res, next) => {
	try {	
		const { content } = req.body;
		if (!content || !content.trim()) {
		    return next(new AppError("Content is required", 400))
		};

		const titles =  await titleGenerator(content);

		res.status(200).json({
			success: true,
			data: titles,
		});
	} catch (err) {
		next(err);
	}
};
