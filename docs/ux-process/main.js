
function init() {
	var brand = this.brand || (this.attributes.brand || { value: 'scania' }).value;

	this.setAttribute('ng-controller', 'Main as main');

	angular.module('ux-process', [])
		.controller('Main', Main)
		.factory('data', data)
		.value('brand', brand)
		.filter('spaceless', spaceless);

	angular.bootstrap(this, ['ux-process']);

	function Main(data) {
		var vm = this;
		window.component = vm;
		vm.items = [];

		// This will not be needed when we use shadow dom mode
		vm.thresholdInit = function(items, threshold) {
			Polymer.updateStyles({
				'--process-items' 		: items.length + 1,
				'--process-grid-count' 	: threshold + ' / ' + (threshold + 2)
			});
		}

		data.get()
			.then(success, fail);

		function success(res) {
			vm.items = res.data;
		}
		function fail(res) {
			console.log('Error: ', res);
		}
	}
	function data($http, $document, brand) {
		var serviceurl = '',
			lang = ($document[0].documentElement.lang || 'en').split('-')[0];

		switch(brand) {
			case 'scania':
				serviceurl = 'https://rawgit.com/corporate-ui/translations/master/' + lang + '/ux-process.json';
				break;
			default:
		}
		return {
			get: function(argument) {
				return $http.get(serviceurl);
			}
		}
	}
	function spaceless() {
		return function(string) {
			string = string.replace(/#/g, '2'); // Temporary remove hash to not get error
			return string.replace(/\s+/g, '-');
		}
	}
}
