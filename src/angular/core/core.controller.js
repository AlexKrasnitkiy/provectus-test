(function () {
    'use strict';

    angular
        .module('test.app.Core')
        .controller('CoreController', CoreController);

    CoreController.$inject = ['CoreService'];

    function CoreController(CoreService) {

        var vm = this;
        vm.contentList = {};
        vm.form = {};
        vm.sendForm = sendForm;


		
        activate();
        
        function activate() {
            getData();
        }

        function getData() {
            CoreService.getTestData().then(function (response) {
              vm.contentList = response;
                prepareData( vm.contentList);
            }).catch(function (error) {
                console.log('Error in getData', error);
            })
        }

        function prepareData(items) {
            var today = new Date();
            today.getTime();

            _.remove(items, function (item) {
                item.expirationDate = moment(item.expirationDate, "MM-DD-YYYY").toDate("MM-DD-YYYY");
                return item.expirationDate < today;
            });
        }

        function sendForm() {
            if (vm.name) {
                vm.form.name = vm.name;
            }
            if (vm.email){
                vm.form.email = vm.email;
            }
            if (vm.comment){
                vm.form.comment = vm.comment;
            }
            console.log(vm.form);
            if (vm.form.name) {
                CoreService.sendForm(vm.form).then(function (response) {
                    console.log('SUCCESS', response);
                    vm.name = null;
                    vm.email = null;
                    vm.comment = null;
                }).catch(function (error) {
                    console.warn('ERROR', error);
                });
            }

    }
    }

})();