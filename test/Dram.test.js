const Dram = artifacts.require('Dram');
const assert = require('assert');

const TOTAL_SUPPLY = 10;
const DECIMALS = 3;

contract('Dram', (accounts) => {
    it('should have a correct name', async () => {
        const dram = await Dram.deployed('Dram', 'DRM', TOTAL_SUPPLY, DECIMALS);
        const name = await dram.name();
        assert.equal(name, 'Dram', 'has correct name');
    })

    it('should have a correct symbol', async () => {
        const dram = await Dram.deployed('Dram', 'DRM', TOTAL_SUPPLY, DECIMALS);
        const symbol = await dram.symbol();
        assert.equal(symbol, 'DRM', 'has correct symbol');
    })

    it('should have a correct totalSupply', async () => {
        const dram = await Dram.deployed('Dram', 'DRM', TOTAL_SUPPLY, DECIMALS);
        const totalSupply = await dram.totalSupply();
        assert.equal(totalSupply.toNumber(), 10, 'has correct totalSupply');
    })

    it('owner should have all tokens', async () => {
        const dram = await Dram.deployed('Dram', 'DRM', TOTAL_SUPPLY, DECIMALS);
        const ownerBalance = await dram.balanceOf(accounts[0]);
        assert.equal(ownerBalance.toNumber(), TOTAL_SUPPLY, 'owner has correct balance');
    })

    it('should do the trasnfer', async () => {
        const dram = await Dram.deployed('Dram', 'DRM', TOTAL_SUPPLY, DECIMALS);
        await dram.transfer(accounts[1], 4);

        const ownerBalance = await dram.balanceOf(accounts[0]);
        assert.equal(ownerBalance.toNumber(), TOTAL_SUPPLY - 4, 'owner has correct balance');

        const toBalance = await dram.balanceOf(accounts[1]);
        assert.equal(toBalance.toNumber(), 4, 'owner has correct balance');
    })

    it('should fail if not enough tokens', async () => {
        const dram = await Dram.deployed('Dram', 'DRM', TOTAL_SUPPLY, DECIMALS);
        try {
            await dram.transfer(accounts[1], 15);
        } catch (error) {
            assert.match(error.message, /Sender does not have enough funds/)
        }
    })

    it('should fail if owner does not have allowance', async () => {
        const dram = await Dram.deployed('Dram', 'DRM', TOTAL_SUPPLY, DECIMALS);
        try {
            await dram.transferFrom(accounts[0], accounts[1] , 5);
        } catch (error) {
            assert.match(error.message, /Owner does not have enough allowance/)
        }
    })

    it('should have correct allowance after approving', async () => {
        const dram = await Dram.deployed('Dram', 'DRM', TOTAL_SUPPLY, DECIMALS);
        await dram.approve(accounts[1], 5, {
            from: accounts[0]
        });
        const allowance = await dram.allowance(accounts[0], accounts[1]);
        assert.equal(allowance.toNumber(), 5, 'has correct allowance')
    })
})