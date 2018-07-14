// Distinguishes between tap or scroll events on touch devices

'use strict';

( function( app ) {
  app.GOJI = app.GOJI || {};

  app.GOJI.isTapOrScroll = {

    // Vars
    startX: null,
    startY: null,
    deltaX: 20,
    deltaY: 10,
    isTap: false,

    setStartCoord: function( e ) {
      this.startX = this.getCoord( e, 'X' );
      this.startY = this.getCoord( e, 'Y' );
    },

    getCoord: function( e, c ) {
      if ( e ) {
        return /touch/.test( e.type ) ? ( e.originalEvent || e ).changedTouches[ 0 ][ 'page' + c ] : e[ 'page' + c ];
      }
    },

    noScroll: function( e ) {
      return (
        Math.abs( this.getCoord( e, 'X' ) - this.startX ) < this.deltaX &&
        Math.abs( this.getCoord( e, 'Y' ) - this.startY ) < this.deltaY
      );
    },

    setTap: function( ) {
      var tap = this.isTap;
      tap = true;
      setTimeout( function( ) {
        tap = false;
      }, 500 );
    }

  };

} )( typeof global !== 'undefined' && global !== null ? global : window );
