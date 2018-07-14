// Navigation drawer

'use strict';

( function( $, app ) {
  app.GOJI = app.GOJI || {};

  /**
   * @function initNavDrawer
   * Initializes the navigation drawer.
   */
  app.GOJI.initNavDrawer = function( ) {

    //
    // Vars
    //

    var that = this; // Function invocation pattern workaround for this scope
    var tapDetect = app.GOJI.isTapOrScroll;
    var $body = $( 'body' );
    var $overlay = $( '.overlay' );
    var $menuButton =  $( '.toolbar__menu-button' );
    var $navDrawer = $( '.nav-drawer' );
    var $navLink = $( '.nav-drawer__link' );
    // var state = {
    //   drawer: {
    //     docked: false
    //   }
    // }
    // var xlarge = '(min-width: 1480px)';


    //
    // Functions
    //

    /**
     * @function isOverlayVisible
     * Checks if overlay is visible.
     *
     * @return {boolean}
     */
    var isOverlayVisible = function( ) {
      return $overlay.hasClass( 'overlay--visible' );
    };


    /**
     * @function hideOverlay
     * Hides the overlay.
     */
    var hideOverlay = function( ) {
      if ( isOverlayVisible( ) ) {
        $overlay.removeClass( 'overlay--visible' );
        bodyScroll( );
      }
    };


    /**
     * @function toggleOverlay
     * Toggles visibility of overlay.
     */
    var toggleOverlay = function( ) {
      $overlay.toggleClass( 'overlay--visible' );
    };


    /**
     * @function isNavDrawerVisible
     * Checks if navigation drawer is visible.
     *
     * @return {boolean}
     */
    var isNavDrawerVisible = function( ) {
      return $navDrawer.hasClass( 'nav-drawer--visible' );
    };


    /**
     * @function hideNavDrawer
     * Hides the navigation drawer.
     */
    var hideNavDrawer = function( ) {
      if ( isNavDrawerVisible( ) ) {
        $navDrawer.removeClass( 'nav-drawer--visible' );
      }
    };


    /**
     * @function toggleNavDrawer
     * Toggles visibiliy of navigation drawer.
     */
    var toggleNavDrawer = function( ) {
      $navDrawer.toggleClass( 'nav-drawer--visible' );
    };


    /**
     * @function noBodyScroll
     * Sets overflow-y of body to hidden.
     */
    var noBodyScroll = function( ) {
      $body.css( 'overflow-y', 'hidden' );
    };


    /**
     * @function bodyScroll
     * Sets overflow-y of body to auto.
     */
    var bodyScroll = function( ) {
      $body.css( 'overflow-y', 'auto' );
    };


    /**
     * @function slideNavDrawer
     * Slides the navigation drawer and sets the corresponding overlay
     * status.
     */
    var slideNavDrawer = function( ) {
      toggleNavDrawer( );
      toggleOverlay( );
      isOverlayVisible( ) ? noBodyScroll( ) : bodyScroll( );
    };


    /**
     * @function navItemClicked
     * Sets classes and performs actions for a clicked navigation link.
     *
     * @param {object} item – The clicked navigation element.
     */
    var navItemClicked = function( item ) {
      var $this = $( item );

      if ( !$this.hasClass( 'nav-drawer__link--active' ) ) {
        // Remove any active status
        $( '.nav-drawer__link--active' ).removeClass( 'nav-drawer__link--active' );

        // Add active status to selected nav item
        $this.addClass( 'nav-drawer__link--active' );
      }

      // Update location as default action of event
      // has not been triggered
      window.location = $this[0].pathname;
    };


    /**
     * @function watchNavDrawer
     * Sets the nav drawer to a correct state when resizing the browser window.
     */
    var watchNavDrawer = function( ) {
      hideNavDrawer( );
      hideOverlay( );
    };
    window.addEventListener( 'resize', watchNavDrawer );


    /**
     * @function setNavDrawer
     * Inital setting on page load. Docks navigation drawer for xlarge viewports
     * and sets the state.
     */
    var setNavDrawer = function( ) {
      var $activeLink = $( '.nav-drawer__link--active ');
    }( );


    //
    // Event handlers
    //

    /**
     * @function touchClickHandler
     * Handles touch/click events on registered elements.
     *
     * @param {object} el – The element that should be registered for the event.
     * @param {function} callback – The callback function.
     */
    var touchClickHandler = function( el, callback ) {
      // touchstart
      el.on( 'touchstart', function( e ) {
        tapDetect.setStartCoord( e );

      // touchend
      } ).on( 'touchend', function( e ) {

        // Prevent emulated mouse events
        e.preventDefault( );

        if ( tapDetect.noScroll( e ) ){
          callback( this );
        }

        tapDetect.setTap( );

      // click
      } ).on( 'click', function( e ) {

        // If handler was not called on touchend, call it on click
        if ( !tapDetect.isTap ) {
          callback( this );
        }
        e.preventDefault( );

      } );
    };
    touchClickHandler( $overlay, slideNavDrawer );
    touchClickHandler( $menuButton, slideNavDrawer );
    touchClickHandler( $navLink, navItemClicked );

  };

} )( jQuery, typeof global !== 'undefined' && global !== null ? global : window );
