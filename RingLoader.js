var React = require('react');
var assign = require('react-kit/appendVendorPrefix');
var insertKeyframesRule = require('react-kit/insertKeyframesRule');

/**
 * @type {Object}
 */
var rightRotateKeyframes = {
    '0%': {
        transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)'

    },
    '100%': {
        transform: 'rotateX(180deg) rotateY(360deg) rotateZ(360deg)'
    }
};

/**
 * @type {Object}
 */
var leftRotateKeyframes = {
    '0%': {
        transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)'
    },
    '100%': {
        transform: 'rotateX(360deg) rotateY(180deg) rotateZ(360deg)'
    }
};

/**
 * @type {String}
 */
var rightRotateAnimationName = insertKeyframesRule(rightRotateKeyframes);

/**
 * @type {String}
 */
var leftRotateAnimationName = insertKeyframesRule(leftRotateKeyframes);

var Loader = React.createClass({displayName: "Loader",
    /**
     * @type {Object}
     */
    propTypes: {
        loading: React.PropTypes.bool,
        color: React.PropTypes.string,
        size: React.PropTypes.string,
        margin: React.PropTypes.string
    },

    /**
     * @return {Object}
     */
    getDefaultProps: function() {
        return {
            loading: true,
            color: '#ffffff',
            size: '60px'
        };
    },

    /**
     * @param {String} size
     * @return {Object}
     */
    getCircleStyle: function(size) {
        return {
            width: size,
            height: size,
            border: size/10 +'px solid ' + this.props.color,
            opacity: 0.4,
            borderRadius: '100%'
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getAnimationStyle: function(i) {
        var animation = [i==1? rightRotateAnimationName: leftRotateAnimationName, '2s', '0s', 'infinite', 'linear'].join(' ');
        var animationFillMode = 'forwards';
        var perspective = '800px';

        return {
            perspective: perspective,
            animation: animation,
            animationFillMode: animationFillMode
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getStyle: function(i) {
        var size = parseInt(this.props.size);

        if (i) {
            return assign(
                this.getCircleStyle(size),
                this.getAnimationStyle(i),
                {
                    position: 'absolute',
                    top: 0,
                    left: 0
                }
            );
        }

        return {
            width: size,
            height: size,
            position: 'relative'
        };
    },

    /**
     * @param  {Boolean} loading
     * @return {ReactComponent || null}
     */
    renderLoader: function(loading) {
        if (loading) {
            return (
                React.createElement("div", {id: this.props.id, className: this.props.className}, 
                    React.createElement("div", {style: this.getStyle(0)}, 
                        React.createElement("div", {style: this.getStyle(1)}), 
                        React.createElement("div", {style: this.getStyle(2)})
                    )
                )
            );
        }

        return null;
    },

    render: function() {
        return this.renderLoader(this.props.loading);
    }
});

module.exports = Loader;
