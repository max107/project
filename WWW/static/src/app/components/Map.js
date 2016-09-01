import React, { Component } from 'react';
import $ from 'jquery';

window.gMapsCallback = () => $(window).trigger('gMapsLoaded');

export default class Map extends Component {
    static defaultProps = {
        google_map_url: "http://maps.google.com/maps/api/js?sensor=false&callback=gMapsCallback"
    };

    state = {
        lat: 58.603478,
        lng: 49.682988
    };

    initialize() {
        let MY_MAPTYPE_ID = 'custom';
        let customMapType = new google.maps.StyledMapType(
            [{stylers: [{saturation: -100}]}],
            {name: 'Custom Style'}),
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: new google.maps.LatLng(this.state.lat, this.state.lng),
                disableDefaultUI: true,
                mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
                },
                mapTypeId: MY_MAPTYPE_ID,
                scrollwheel: false
            }),
            image = {
                url: '/static/dist/images/main/marker.png',
                scaledSize: window.devicePixelRatio > 1.5 ? new google.maps.Size(21, 25) : new google.maps.Size(42, 50)
            },
            myLatLng = new google.maps.LatLng(this.state.lat, this.state.lng),
            marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                icon: image
            }),
            center,
            calculateCenter = () => {
                center = map.getCenter();
            };

        map.mapTypes.set(MY_MAPTYPE_ID, customMapType);

        google.maps.event.addDomListener(map, 'idle', () => {
            calculateCenter();
        });
        google.maps.event.addDomListener(window, 'resize', () => {
            let center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        });
    }

    loadGoogleMaps() {
        let scr = document.createElement('script');
        scr.setAttribute("type", "text/javascript");
        scr.setAttribute("src", this.props.google_map_url);
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(scr);
    }

    initGoogleMaps() {
        this.initialize();
    }

    componentDidMount() {
        if (typeof google == 'undefined') {
            this.loadGoogleMaps();
            $(window).bind('gMapsLoaded', this.initGoogleMaps.bind(this));
        } else {
            this.initGoogleMaps();
        }
    }

    render() {
        return <div id="map"></div>;
    }
}
