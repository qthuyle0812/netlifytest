//= require jquery/dist/jquery
//= require modules/_tap-or-scroll
//= require modules/_nav-drawer
//= require modules/_google_analytics
//= require modules/_facebook

'use strict';

( function( $, app ) {

  // Ready...
  $( document ).ready( function( ) {
    var $ready= $( '.app--ready' );
    var $loading = $( '.app--loading' );

    app.GOJI.initNavDrawer( );
    app.GOJI.initFacebook( );

    $ready.addClass( 'app--visible' );
    $loading.addClass( 'app--hidden' );
  } );

} )( jQuery, typeof global !== 'undefined' && global !== null ? global : window );
