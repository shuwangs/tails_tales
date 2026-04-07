import titleGenerator from "../utils/titleGenerator.js";
import textTranslator from "../utils/textTranslation.js";
export const suggestTitles = async (req, res, next) => {
	console.log("suggesting title controller is called....");
	try {
		const { content } = req.body;
		if (!content || !content.trim()) {
			return next(new AppError("Content is required", 400));
		}

		const titles = await titleGenerator(content);
		console.log("ai generated titles are: ", titles);
		res.status(200).json({
			success: true,
			data: titles,
		});
	} catch (err) {
		next(err);
	}
};

export const translateContent = async (req, res, next) => {
	console.log("translating controller is called....");
	try {
		const { content, target } = req.body;
		if (!content || !content.trim()) {
			return next(new AppError("Content is required", 400));
		}
		if (!target || !target.trim()) {
			return next(new AppError("Target language is required", 400));
		}

		const translated = await textTranslator(content, target);
		console.log("translating content is: ", translated);
		res.status(200).json({
			success: true,
			data: translated,
		});
	} catch (err) {
		next(err);
	}
};
