export default function range(min, max) {
	console.log(min, max);
	return [...Array(max - min + 1).keys()].map(k => k + min);
}