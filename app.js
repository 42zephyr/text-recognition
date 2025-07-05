angular.module('orcApp', [])
  
  .controller('OcrController', ['$scope', function($scope) {
    
    $scope.imageSrc = null;
    $scope.uploadedFile = null;
    $scope.recognizedText = '';
    
    $scope.previewImage = function(event) {
      const file = event.target.files[0];
      if (file && (file.type === 'image/jpeg' || file.type === 'image/png') && file.size <= 2 * 1024 * 1024) {
        const reader = new FileReader();
        reader.onload = function(e) {
          $scope.$apply(function() {
            $scope.imageSrc = e.target.result;
            $scope.uploadedFile = file;
          });
        };
        reader.readAsDataURL(file);
      } else {
        alert('Будь ласка, завантажте .jpg або .png файл розміром до 2MB.');
      }
    };

    $scope.extractText = function() {
      if (!$scope.uploadedFile) return;

      Tesseract.recognize($scope.uploadedFile, 'eng')
        .then(({ data: { text } }) => {
          $scope.$apply(() => {
            $scope.recognizedText = text;
          });
        })
        .catch((err) => {
          console.error(err);
          alert('Помилка при розпізнаванні тексту.');
        });
        return 'letterList.html';
    };

    $scope.copyText = function() {
      if ($scope.recognizedText) {
        navigator.clipboard.writeText($scope.recognizedText)
          .then(() => alert('Текст скопійовано!'))
          .catch(() => alert('Не вдалося скопіювати текст.'));
      }
    };
  }]);
