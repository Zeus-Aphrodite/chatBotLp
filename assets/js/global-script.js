// $(function () {
// 	$('.submitToRehome').on('click', function (e) {
// 		e.preventDefault();
// 		var formData = $('.js_save_data_rehome');
// 		$.ajax({
// 			type: 'post',
// 			url: formData.attr('action'),
// 			dataType: 'json',
// 			data: formData.serialize()
// 		}).done(function (response) {
// 			if (response.status == 'success') {
// 				window.location.href = response.redirect;
// 			} else if (response.status == 'errors') {
// 				var messages = response.messages.replace(/ /g, '<br>');
// 				$('.notification_error').html(messages);
// 			} else {
// 				console.log(response);
// 			}
// 		}).fail(function (err) {
// 			console.log(err);
// 		});
// 	});
// })
