import {sum} from './card';

it('should add sum', () => {
	let num = sum(3, 5);
	expect(num).toBe(8);
})