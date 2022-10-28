<template>
    <div class="city-map-svg" ref="cityMap">
        <!-- 
        <CityParks />

        <CityLights /> -->

        <!-- <CityRoadOne /> -->

        <!-- <CityBuilding /> -->
    </div>
</template>

<script>
    // import * as PIXI  from 'pixi.js'
    export default {
        name: 'CityMapSVG',
        async mounted(){
            const PIXI = await import('pixi.js');
            this.app  = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight });
            this.$refs.cityMap.appendChild(this.app.view);
            
            var beeSvg = "/images/LightCity.jpg";
            var beeTexture = new PIXI.Texture.fromImage(beeSvg, undefined, undefined, 1.0);
            var map = new PIXI.Sprite.from('/images/LightCity.jpg');
            map.anchor.set(0.5);

            // move the sprite to the center of the screen
            map.x = this.app.screen.width / 2;
            map.y = this.app.screen.height / 2;

            this.app.stage.addChild(map);

            map.interactive = true;

    // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
            map.buttonMode = true;

            map.on('pointerdown', onDragStart)
                .on('pointerup', onDragEnd)
                .on('pointerupoutside', onDragEnd)
                .on('pointermove', onDragMove);

            function onDragStart(event) {
                // store a reference to the data
                // the reason for this is because of multitouch
                // we want to track the movement of this particular touch
                this.data = event.data;

                //store this variable for convenience           
                let position = this.data.getLocalPosition(this);

                // Set the pivot point to the new position
                this.pivot.set(position.x, position.y)

                // update the new position of the sprite to the position obtained through 
                // the global data. This ensures the position lines up with the location of 
                // the mouse on the screen. I'm not certain why, but this is necessary. 
                this.position.set(this.data.global.x, this.data.global.y)
                this.dragging = true;
            }

            function onDragEnd() {
                this.alpha = 1;
                this.dragging = false;
                // set the interaction data to null
                this.data = null;
            }

            function onDragMove() {
                if (this.dragging) {
                    var newPosition = this.data.getLocalPosition(this.parent);
                    this.x = newPosition.x;
                    this.y = newPosition.y;
                }
            }


           // let app = new PIXI.Application({ width: 640, height: 360 });
            // document.body.appendChild(app.view);
        }
    }
</script>