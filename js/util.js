module.exports = {
    
    ignoreNonLetter: function ignoreNonLetter(str) {
        return str ? str.replace(/[^a-zA-Z]/g, '').toLowerCase() : '';
    },
    
    affirmToBool: function(affirm) {
        if ( affirm === 'Yes' || affirm === 'yes' ) {
            return true;
        } else if ( affirm === 'No' || affirm === 'no' ) {
            return false;
        }
        return affirm;
    },
    
    boolToAffirm: function(bool) {
        if ( bool === true ) {
            return 'Yes';
        } else if ( bool === false ) {
            return 'No';
        }
        return bool;
    },

    scrub: function(str) {
        return str ? str.replace(/\W/g, '') : undefined;
    }
};
