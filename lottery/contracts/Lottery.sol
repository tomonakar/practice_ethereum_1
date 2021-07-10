pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;

    function Lottery() public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }

    function random() private view returns (uint256) {
        return uint256(keccak256(block.difficulty, now, players));
    }

    function pickWinner() public restricted {
        uint256 index = random() % players.length;
        players[index].transfer(this.balance);
        players = new address[](0);
    }

    // 関数修飾子（modifier)はある関数を実行する前に必ず実行したい処理
    modifier restricted() {
        require(msg.sender == manager);
        _; // _は関数修飾子自体を実行する
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }
}
