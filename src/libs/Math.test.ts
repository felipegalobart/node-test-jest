import { Math } from './Math';

describe('Testing Math library', () => {

	it('should sum two numbers', () => {
		const response = Math.sum(5, 10);
		expect(response).toBe(15);
	});

	it('should subtract two numbers', () => {
		const response = Math.sub(4, 2);
		expect(response).toBe(2);
	});

	it('should multiply two numbers', () => {
		const response = Math.mut(3, 5);
		expect(response).toBe(15);
	});

	it('should divide two numbers', () => {
		const response = Math.div(15, 5);
		expect(response).toBe(3);

		const response2 = Math.div(3, 0);
		expect(response2).toBe(null);
	});


});
