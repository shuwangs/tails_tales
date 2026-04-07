export const getMoodIcon = (mood) => {
	switch (mood) {
		case "happy":
			return "😺";

		case "sad":
			return "😿";

		case "excited":
			return "😸";

		case "loved":
			return "😽";

		case "bored":
			return "😼";

		case "anxious":
			return "🙀";

		case "angry":
			return "😾";

		default:
			break;
	}
};

export const getWeatherIcon = (weather) => {
	switch (weather) {
		case "sunny":
			return "☀️";

		case "cloudy":
			return "☁️";

		case "rainy":
			return "🌧️";

		case "snowy":
			return "❄️";

		case "windy":
			return "🌬️";

		case "foggy":
			return "⛈️";

		default:
			break;
	}
};


export const getFlagIcon = (code) => {
	switch (code) {
		case "en":
			return "🇺🇸";

		case "es":
			return "🇪🇸";

		case "zh":
			return "🇨🇳";

		case "fr":
			return "🇫🇷";

		case "ja":
			return "🇯🇵";

		default:
			break;
	}
};