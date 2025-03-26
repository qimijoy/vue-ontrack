import { MILLISECONDS_IN_SECOND } from '@/constants/time';

export const formatSeconds = (seconds) => {
	const date = new Date();

	date.setTime(Math.abs(seconds) * MILLISECONDS_IN_SECOND);

	const utc = date.toUTCString();

	return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6);
};

export const formatSecondsWithSign = (seconds) => {
	return `${seconds.value >= 0 ? '+' : '-'}${formatSeconds(seconds)}`;
};
