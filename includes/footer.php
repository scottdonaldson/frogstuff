		</main>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="<?= $url; ?>/js/vendor/jquery-2.1.3.min.js"><\/script>')</script>
        <script src="<?= $url; ?>/js/plugins.js"></script>
        <script src="<?= $url; ?>/js/main.js"></script>
		<?php if ( $class == 'save-the-date' ) { ?>
			<script src="<?= $url; ?>/js/get-address.js"></script>
		<?php } elseif ( $class == 'rsvp' ) { ?>
			<script src="<?= $url; ?>/js/output/rsvp.js"></script>
		<?php } ?>

		<script>
		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		  ga('create', 'UA-9215814-20', 'auto');
		  ga('send', 'pageview');

		</script>

    </body>
</html>
