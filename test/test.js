var PatriciaTree = require('../patricia');
var assert = require('assert').ok;

describe('PatriciaTree', function(){
	describe('#insert()', function() {
		it('should increase the number of elements', function () {
			var tree = new PatriciaTree();
			tree.insert('Newton');
			tree.insert('Pascal');
			tree.insert('Leibniz');
			assert(tree.count === 3);
		});

		it('should increase the frequency when inserting the same element multiple times', function () {
			var tree = new PatriciaTree();
			tree.insert('Newton');
			tree.insert('Newton');
			assert(tree.count === 2);
			assert(tree.frequency('Newton') === 2);
		});

		it('should *not* insert empty string', function() {
			var tree = new PatriciaTree();
			tree.insert('');
			assert(tree.count === 0);
		});
	});

	describe('#contains()', function(){
		it('should find the item when there is only one item', function() {
			var tree = new PatriciaTree();
			tree.insert('Newton');
			assert(tree.contains('Newton'));
		});

		it('should find all items when there are multiple', function() {
			var tree = new PatriciaTree();
			tree.insert('Newton');
			tree.insert('Pascal');
			assert(tree.contains('Newton'));
			assert(tree.contains('Pascal'));
		});

		it('should find all items when there are multiple overlapping', function() {
			var tree = new PatriciaTree();
			tree.insert('Newark');
			tree.insert('New Hampshire');
			tree.insert('New Hamp');
			tree.insert('Newcomb');
			tree.insert('Budapest');
			tree.insert('Bukarest');
			tree.insert('Bu');
			assert(tree.contains('Newark'));
			assert(tree.contains('New Hampshire'));
			assert(tree.contains('New Hamp'));
			assert(tree.contains('Newcomb'));
			assert(tree.contains('Budapest'));
			assert(tree.contains('Bukarest'));
			assert(tree.contains('Bu'));
		});

		it('should *not* find empty string', function() {
			var tree = new PatriciaTree();
			assert(!tree.contains(''));
		});

		it('should *not* find not existing items', function() {
			var tree = new PatriciaTree();
			tree.insert('New');
			tree.insert('Budapest');
			tree.insert('Bukarest');
			assert(!tree.contains('New Hampshire'));
			assert(!tree.contains('Ne'));
			assert(!tree.contains('New '));
			assert(!tree.contains('Bu'));
		});

	});

	describe('#frequency()', function() {
		it('should be 0 for not existing items', function () {
			var tree = new PatriciaTree();
			tree.insert('New');
			assert(!tree.contains('Budapest'));
			assert(!tree.contains('Neu'));
		});
	});

	describe('#complete()', function() {
		it('should provide autocompletion', function () {
			var tree = new PatriciaTree();
			tree.insert('Magnus');
			tree.insert('Magna Charta');
			var completions = tree.complete('Mag');
			assert(completions.length === 2);
		});
	});
});
