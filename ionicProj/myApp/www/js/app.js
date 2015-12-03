// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
      
      

    ionic.Platform.fullScreen();
    if (window.StatusBar) {
      return StatusBar.hide();
    }
  });
})

.controller('AppCtrl', ['$scope', '$ionicModal', function($scope, $ionicModal) {

  $scope.data = {
    enableAwesome: true
  }

  $ionicModal.fromTemplateUrl('settings.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  });

  $scope.openSettings = function() {
    $scope.modal.show();
  };

  $scope.closeSettings = function() {
    $scope.modal.hide();
  };

}])

.directive('cardboardGl', [function() {

  return {
    restrict: 'E',
    link: function($scope, $element, $attr) {
      create($element[0]);
    }
  }

  function create(glFrame) {
    var scene,
        camera,
        renderer,
        element,
        container,
        effect,
        controls,
        clock,

        // Particles
        particles = new THREE.Object3D(),
        totalParticles = 200,
        maxParticleSize = 200,
        particleRotationSpeed = 0,
        particleRotationDeg = 0,
        lastColorRange = [0, 0.3],
        currentColorRange = [0, 0.3],
         video, videoImage, videoImageContext, videoTexture;

        // City and weather API set up
        cities = [['Sydney', '2147714'], ['New York', '5128638'], ['Tokyo', '1850147'], ['London', '2643743'], ['Mexico City', '3530597'], ['Miami', '4164138'], ['San Francisco', '5391959'], ['Rome', '3169070']],
        cityWeather = {},
        cityTimes = [],
        currentCity = 0,
        currentCityText = new THREE.TextGeometry(),
        currentCityTextMesh = new THREE.Mesh();

    init();

    function init() {
      scene = new THREE.Scene();
      //Was 90 for first value and .001 for second value
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
      //camera.position.set(0, 50, 0);
        camera.position.set(0, 0, 0);
        
      scene.add(camera);
      
     

      renderer = new THREE.WebGLRenderer();
      element = renderer.domElement;
      container = glFrame;
      container.appendChild(element);

      effect = new THREE.StereoEffect(renderer);

      // Our initial control fallback with mouse/touch events in case DeviceOrientation is not enabled
      controls = new THREE.OrbitControls(camera, element);
      controls.target.set(
        camera.position.x + 0.000001,
        camera.position.y,
        camera.position.z
      );
      controls.noPan = true;
      controls.noZoom = true;

      // Our preferred controls via DeviceOrientation
      function setOrientationControls(e) {
        if (!e.alpha) {
          return;
        }

        controls = new THREE.DeviceOrientationControls(camera, true);
        controls.connect();
        controls.update();

        element.addEventListener('click', fullscreen, false);

        window.removeEventListener('deviceorientation', setOrientationControls, true);
      }
      window.addEventListener('deviceorientation', setOrientationControls, true);
        
    
      // Lighting
        
        var newlight = new THREE.SpotLight(0xffffff);
        newlight.position.set( -150, 150, 150 );

        var pointLight = new THREE.PointLight( 0xffffff);
        pointLight.position.set( -50, 50, 50 );

        scene.add(newlight);
        scene.add(pointLight);
    
    var directionalLight = new THREE.DirectionalLight( 0xffffff );
    directionalLight.position.set( 0, 50, 0 ).normalize();
    scene.add( directionalLight );
        
    var secondDirectionalLight = new THREE.DirectionalLight (0xffffff);
    secondDirectionalLight.position.set(0,0,0).normalize();
    
    var ambient = new THREE.AmbientLight( 0xffffff);
    scene.add( ambient ); 
    
    var light = new THREE.PointLight(0xFFFFFF, 2, 100);
    light.position.set(0, 0, 0);
    scene.add(light);

    // creating a sphere
    /*var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(128, 128, 64),
    new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('img/textures/PANO_20150404_132909.jpg')
    })*/
      /* new THREE.MeshBasicMaterial({ 
           map: videoTexture, overdraw: true,   
           side:THREE.DoubleSide })*/
    //);
        //sphere.position.set(5, 100, 0);
    /*sphere.position.set(0,0,0);
    sphere.scale.x = -1;*/
        
        
        ///////////
	// VIDEO //
	///////////
	
	// create the video element
	video = document.createElement( 'video' );
	// video.id = 'video';
	// video.type = ' video/ogg; codecs="theora, vorbis" ';
	video.src = "js/bike.mp4";
	video.load(); // must call after setting/changing source
	video.play();
	
	// alternative method -- 
	// create DIV in HTML:
	// <video id="myVideo" autoplay style="display:none">
	//		<source src="videos/sintel.ogv" type='video/ogg; codecs="theora, vorbis"'>
	// </video>
	// and set JS variable:
	// video = document.getElementById( 'myVideo' );
	
	videoImage = document.createElement( 'canvas' );
	videoImage.width = 3840;
	videoImage.height = 2160;

	videoImageContext = videoImage.getContext( '2d' );
	// background color if no video present
	videoImageContext.fillStyle = '#000000';
	videoImageContext.fillRect( 0, 0, videoImage.width, videoImage.height );

	videoTexture = new THREE.Texture( videoImage );
	videoTexture.minFilter = THREE.LinearFilter;
	videoTexture.magFilter = THREE.LinearFilter;
	
	var movieMaterial = new THREE.MeshBasicMaterial( { map: videoTexture, overdraw: true, side:THREE.DoubleSide } );
	// the geometry on which the movie will be displayed;
	// 		movie image will be scaled to fit these dimensions.
	var movieGeometry = new THREE.PlaneGeometry( 240, 100, 4, 4 );
    var movieGeometry = new THREE.SphereGeometry(360, 360,360);
    
	var movieScreen = new THREE.Mesh( movieGeometry, movieMaterial );
	movieScreen.position.set(0,50,0);
    movieScreen.scale.x = -1;
	scene.add(movieScreen);
    
        // LIGHT
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);
	
	camera.position.set(0,0,0);
	camera.lookAt(movieScreen.position)
               
      var floorTexture = THREE.ImageUtils.loadTexture('img/textures/wood.jpg');
      floorTexture.wrapS = THREE.RepeatWrapping;
      floorTexture.wrapT = THREE.RepeatWrapping;
      floorTexture.repeat = new THREE.Vector2(50, 50);
      floorTexture.anisotropy = renderer.getMaxAnisotropy();

      var floorMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 20,
        shading: THREE.FlatShading,
        map: floorTexture
      });

      var geometry = new THREE.PlaneBufferGeometry(1000, 1000);

      var floor = new THREE.Mesh(geometry, floorMaterial);
      floor.rotation.x = -Math.PI / 2;
      //scene.add(floor);

      var particleTexture = THREE.ImageUtils.loadTexture('img/textures/particle.png'),
          spriteMaterial = new THREE.SpriteMaterial({
          map: particleTexture,
          color: 0xffffff
        });

      for (var i = 0; i < totalParticles; i++) {
        var sprite = new THREE.Sprite(spriteMaterial);

        sprite.scale.set(64, 64, 1.0);
        sprite.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.75);
        sprite.position.setLength(maxParticleSize * Math.random());

        sprite.material.blending = THREE.AdditiveBlending;

        particles.add(sprite);
      }
      particles.position.y = 70;
      //scene.add(particles);
     

      //adjustToWeatherConditions();

      clock = new THREE.Clock();

      animate();
    }
      
    function animate() {

      requestAnimationFrame(animate);

      update(clock.getDelta());
      render(clock.getDelta());
    }

    function resize() {
      var width = container.offsetWidth;
      var height = container.offsetHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      effect.setSize(width, height);
    }

    function update(dt) {
      resize();

      camera.updateProjectionMatrix();

      controls.update(dt);
    }

    function render(dt) {
      effect.render(scene, camera);
        videoImageContext.drawImage( video, 0, 0 );
		if ( videoTexture ) 
			videoTexture.needsUpdate = true;
    }

    function fullscreen() {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      }
    }

    function getURL(url, callback) {
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
           if (xmlhttp.status == 200){
               callback(JSON.parse(xmlhttp.responseText));
           }
           else {
               console.log('We had an error, status code: ', xmlhttp.status);
           }
        }
      }

      xmlhttp.open('GET', url, true);
      xmlhttp.send();
    }
  }
}]);
