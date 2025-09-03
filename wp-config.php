<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'steven_wpdu' );

/** Database username */
define( 'DB_USER', 'wordpress' );

/** Database password */
define( 'DB_PASSWORD', 'Iloveyanyan@163' );

/** Database hostname */
// define( 'DB_HOST', 'localhost' );
define( 'DB_HOST', '127.0.0.1' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 
define( 'AUTH_KEY',         'put your unique phrase here' );
define( 'SECURE_AUTH_KEY',  'put your unique phrase here' );
define( 'LOGGED_IN_KEY',    'put your unique phrase here' );
define( 'NONCE_KEY',        'put your unique phrase here' );
define( 'AUTH_SALT',        'put your unique phrase here' );
define( 'SECURE_AUTH_SALT', 'put your unique phrase here' );
define( 'LOGGED_IN_SALT',   'put your unique phrase here' );
define( 'NONCE_SALT',       'put your unique phrase here' );
*/

define('AUTH_KEY',         '~*%85,!Z3i0ybAzS1+.kiLS&?guL#x@<#<]CNvZ.CL6Z%)-N|WT[=ZC-I=z[DS2}');
define('SECURE_AUTH_KEY',  'P/>+0#g}CKENgpP`?|7gF}2j^i^]-+,#ISsk|=IzHQSRr]+ OU7,)My%UtZ<uO{U');
define('LOGGED_IN_KEY',    '+Az,aX;/Sov1v9_lEbPKypH_w~f-XA$+B0~&+m]u}~ko:;K]STb4Sa|vk3*g!5U2');
define('NONCE_KEY',        '4D0o|E`,Ic#wt9X1(_m{dX)2]RdLDuHZ.x.ZMSS^_o0>C</}/Uc|x]_@3L_lL87f');
define('AUTH_SALT',        '{UFf<sF.J#PkUZ;jMC6)=[4,``$6b*d/V/d!Qj~TKX4WQ@Jy8-]x0d}?@LhVGw+2');
define('SECURE_AUTH_SALT', 'OcM@Bx_$xWE%)& hQgr5-|A8^e6o2-a;I,X]d.a#abj?c[0U`[vp67vT3UScI{%8');
define('LOGGED_IN_SALT',   '-+diMA:hvl[G/t~NQ]Qn XWGDJp&chx7osG44W0>ED(MbHj_NhFn9eUkaFdX*i]m');
define('NONCE_SALT',       'T}bmV{Yi{t[+Y2Pe% 5lj|J_=p-Y]r S 2-+]9NCO !]Mew KrkCI6:s+ZURm2YL');

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

/* added by steven */
define( 'WP_SITEURL', 'https://127.0.0.1/wordpress' );

define( 'WP_HOME', 'https://127.0.0.1/wordpress' );

define( 'AUTOSAVE_INTERVAL', 180 ); // Seconds

// define( 'WP_POST_REVISIONS', false ); //no revisions allowed

// define( 'WP_POST_REVISIONS', 3 );

// define( 'NOBLOGREDIRECT', 'https://example.com' );

/* enable debug messages.
define( 'WP_DISABLE_FATAL_ERROR_HANDLER', true ); // 5.2 and later
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_DISPLAY', true );
*/

define( 'EMPTY_TRASH_DAYS', 3 ); // 3 days

// define( 'FORCE_SSL_ADMIN', true );

// define( 'AUTOMATIC_UPDATER_DISABLED', true );

define( 'IMAGE_EDIT_OVERWRITE', true );