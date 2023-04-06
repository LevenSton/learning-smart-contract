const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("MyToken", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployMyTokenFixture() {
    const name = "MeMe Coin"
    const symbol = "Meme"
    const feeRation = 10
    const burnRatio = 5

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy(name, symbol, feeRation, burnRatio);

    return { MyToken, myToken, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { myToken, owner } = await loadFixture(deployMyTokenFixture);
      expect(await myToken.owner()).to.equal(owner.address);
    });
  });

  describe("Mint", function () {
    it("Should get right balance after mint", async function () {
      const { myToken, owner } = await loadFixture(deployMyTokenFixture);
      expect(await myToken.balanceOf(owner.address)).to.equal(0);
      await myToken.mint(owner.address, 100)
      expect(await myToken.balanceOf(owner.address)).to.equal(100);
    });
  });

  describe("Burn", function () {
    it("Should get right balance after burn", async function () {
      const { myToken, owner } = await loadFixture(deployMyTokenFixture);
      expect(await myToken.balanceOf(owner.address)).to.equal(0);
      await myToken.mint(owner.address, 100)
      expect(await myToken.balanceOf(owner.address)).to.equal(100);
      await myToken.burn(owner.address, 50)
      expect(await myToken.balanceOf(owner.address)).to.equal(50);
    });
  });

  describe("transferSupportChargeFee", function () {
    it("Should get right balance after transferSupportChargeFee", async function () {
      const { myToken, owner, otherAccount } = await loadFixture(deployMyTokenFixture);
      expect(await myToken.balanceOf(owner.address)).to.equal(0);
      await myToken.mint(owner.address, 100)
      expect(await myToken.balanceOf(owner.address)).to.equal(100);
      await myToken.transferSupportChargeFee(otherAccount.address, 10)
      expect(await myToken.balanceOf(otherAccount.address)).to.equal(9);
    });
  });

  describe("transferSupportBurnFee", function () {
    it("Should get right balance after transferSupportBurnFee", async function () {
      const { myToken, owner, otherAccount } = await loadFixture(deployMyTokenFixture);
      expect(await myToken.balanceOf(owner.address)).to.equal(0);
      await myToken.mint(owner.address, 100)
      expect(await myToken.balanceOf(owner.address)).to.equal(100);
      await myToken.transferSupportBurnFee(otherAccount.address, 20)
      expect(await myToken.balanceOf(otherAccount.address)).to.equal(19);
    });
  });

});
