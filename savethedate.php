<?php
$class = 'save-the-date';
include('includes/header.php'); ?>

	<script>
	function buildURL() {
		var key1 = '1aS5R3rKitHu2WBDJvj66',
	        key2 = 'UGRg2MgKwyjlowYZPAerUas';
		return 'https://spreadsheets.google.com/feeds/cells/' + key1 + key2 + '/1/public/basic?alt=json';
	}
	function gup( name ) {
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec( location.href );
		return results == null ? null : results[1];
	}
	</script>

	<div class="content">
		<div class="halfcolumn clearfix">
			<div class="toptext">
				<h2>Dinner, Dancing & Vows of Everlasting Commitment</h2>
				<p>Saturday, May 21, 2016 <br>
					at five in the evening</p>
				<p>Long View Gallery<br>
					1234 9th St NW <br>
		 			Washington, DC </p>

		 		<h2>Send Off Buffet Brunch </h2>
				<p> Morning After Reception <br>
					Morrison Clark Hotel <br>
					9am - 11am <br>
					NO RSVP REQUIRED -- Just pop on in </p>
			</div>
		</div>
		<div id="greetings-container" class="halfcolumn clearfix" style="display: none;">
			<div id="greetings"></div>
			<form>
				<textarea id="address"></textarea>
				<input type="submit">

				<input type="hidden" id="column">
				<input type="hidden" id="row">
			</form>
		</div>
	</div>

<?php include('includes/footer.php'); ?>
