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

    </body>
</html>
