<div id="holder">
	<div id="page">
		{{>header}}
		<div id="body" class="page-section">
			<div class="container">
			{{>login-form}}
			</div>
		</div>
		

	</div>
</div>

<script>
var request = new XMLHttpRequest();
request.open('put', '/', true);
request.setRequestHeader('accept', 'octet-stream');
request.send(null);
request.onreadystatechange = function (req) {
	console.log(req);
};
</script>
