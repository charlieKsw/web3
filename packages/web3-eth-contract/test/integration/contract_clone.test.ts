/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
import { Contract } from '../../src';
import { greeterByteCode, greeterContractAbi } from '../shared_fixtures/sources/Greeter';
import { getSystemTestProvider, getSystemTestAccounts } from '../fixtures/system_test_utils';

describe('contract', () => {
	describe('clone', () => {
		let contract: Contract<typeof greeterContractAbi>;
		let deployOptions: Record<string, unknown>;
		let sendOptions: Record<string, unknown>;
		let accounts: string[];

		beforeEach(async () => {
			contract = new Contract(greeterContractAbi, undefined, {
				provider: getSystemTestProvider(),
			});

			accounts = await getSystemTestAccounts();

			deployOptions = {
				data: greeterByteCode,
				arguments: ['My Greeting'],
			};

			sendOptions = { from: accounts[0], gas: '1000000' };
		});

		it('should clone the contract but with same address', async () => {
			const deployedContract = await contract.deploy(deployOptions).send(sendOptions);

			const newContract = deployedContract.clone();

			expect(newContract).toBeInstanceOf(Contract);
			expect(newContract).not.toBe(deployedContract);
			expect(newContract.options.address).toBe(deployedContract.options.address);
		});
	});
});
