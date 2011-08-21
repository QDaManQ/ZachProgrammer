/** Begin Classes **/

function Emitter(canvasId, startX, startY) {
    this.startX = startX;
    this.startY = startY;




    var s = this;
    $(document).mousemove(function (e) {
        s.startX = e.pageX - 10;
        s.startY = e.pageY - 15;
    });


    this.color = new Array(255, 0, 0, 0.9);



    this.size = 5;
    this.gravity = -1;
    this.friction = 0;
    this.particles = new Array();
    this.maxParticles = 200;
    this.maxBlastParticles = 20;
    this.canvasContext = document.getElementById(canvasId).getContext("2d");

    this.createParticle = function () {
        if (this.particles.length > this.maxParticles) {
            this.particles[0].lifeSpan = 1;
            this.particles[0].velocityX = (Math.random() * 10) - 20;
            this.particles[0].velocityY = (Math.random() * 10) - 15;
            this.particles[0].x = this.startX;
            this.particles[0].y = this.startY;
            this.particles.push(this.particles.shift());
        }
        else {
            var particle = new Particle();
            particle.x = this.startX;
            particle.y = this.startY;
            particle.velocityX = (Math.random() * 10) - 20;
            particle.velocityY = (Math.random() * 10) - 15;

            this.particles.push(particle);
        }
    }

    this.step = function () {
        for (i = 0; i < this.particles.length; i++) {
            this.particles[i].x -= this.particles[i].velocityX;
            this.particles[i].y -= this.particles[i].velocityY;
            this.particles[i].velocityX *= this.friction;
            this.particles[i].velocityY *= this.friction;
            this.particles[i].velocityY -= this.gravity;
            this.particles[i].lifeSpan -= .15;
            this.particles[i].opacity * 0.8;

            if (this.particles[i].lifeSpan < 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    this.draw = function () {
        this.canvasContext.clearRect(0, 0, 1800, 1600);

        for (i = 0; i < this.particles.length; i++) {


            var rand = parseInt(Math.random() * 20);
            if (rand < 5) {
                this.color = new Array(255, 0, 0, 0.9);
            }
            else {
                var r = parseInt(200 * (rand / 20)); // red channel

                this.color = new Array(255, r, 0, 0.9);
            }

            this.canvasContext.fillStyle = 'rgba(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ',' + this.particles[i].opacity + ')';
            this.canvasContext.beginPath();
            this.canvasContext.arc(this.particles[i].x, this.particles[i].y, this.size * this.particles[i].lifeSpan, 0, Math.PI * 2, true);
            this.canvasContext.fill();
        }
    }


}

function Particle() {
    this.x = 0;
    this.y = 0;
    this.velocityY = 0;
    this.velocityX = 0;
    this.lifeSpan = 1;
    this.opacity = 1;
}

/** Begin Base Class **/

$(document).ready(createEmitter);

var emitter;
var delay = 50;
var maxBlastParticles = 30;

function createEmitter() {
    emitter = new Emitter('emitter-canvas', -100, -100);


    fireParticle();
    setInterval('stepEmitter()', 10);

}

function stepEmitter() {
    emitter.step();
    emitter.draw();
}

function fireParticle() {
    for (i = 0; i < maxBlastParticles; i++) {
        emitter.createParticle();
    }
    setTimeout("fireParticle()", Math.random() * delay);
}
/* here */
var InitialMin = 0.4;
var DecayRate = 1;
var GeneratorRowCount = 4;
 
var RowCount;
var ColumnCount;
var CurrentImageIndex;
var ImageHeight;
var FlameImage;
var ImageData;
 
function sheetFire()
{
  var LastImageData = ImageData[CurrentImageIndex];
  CurrentImageIndex = (CurrentImageIndex == 0) ? 1 : 0;
  var CurrentImageData = ImageData[CurrentImageIndex];
  var column;
 
  for( column = 0; column < ColumnCount; column++ )
  {
    CurrentImageData[ column ] = (Math.random( ) * (1 - InitialMin)) + InitialMin;
  }
 
  for( var row = 1; row < RowCount; row++ )
  {
    var rowOffset = row * ColumnCount;
    var lastRowOffset = rowOffset - ColumnCount;
    var lastLastRowOffset = lastRowOffset - ColumnCount;
    var lastLastLastRowOffset = lastRowOffset - ColumnCount;
    for( column = 0; column < ColumnCount; column++ )
    {
      var leftColumn = (column == 0) ? ColumnCount - 1 : column;
      var rightColumn = (column == ColumnCount - 1) ? 0 : column;
 
      // top
      var accum = LastImageData[ leftColumn + rowOffset ];
      accum += LastImageData[ column + rowOffset ];
      accum += LastImageData[ rightColumn + rowOffset ];
 
      //current
      accum += LastImageData[ leftColumn + lastRowOffset ];
      accum += LastImageData[ column + lastRowOffset ] * 2;
      accum += LastImageData[ rightColumn + lastRowOffset ];
 
      var divisor = 7;
      if( lastLastLastRowOffset > 0 )
      {
        accum += LastImageData[ leftColumn + lastLastLastRowOffset ];
        accum += LastImageData[ column + lastLastLastRowOffset ];
        accum += LastImageData[ rightColumn + lastLastLastRowOffset ];
        divisor += 3;
      }
 
      if( lastLastRowOffset > 0 )
      {
        accum += LastImageData[ leftColumn + lastLastRowOffset ];
        accum += LastImageData[ column + lastLastRowOffset ];
        accum += LastImageData[ rightColumn + lastLastRowOffset ];
        divisor += 3;
      }
 
      CurrentImageData[ column + rowOffset ] = (accum / divisor) * (DecayRate + ((Math.random( ) - 0.5) * InitialMin / 4));
    }
  }
 
  var pix = FlameImage.data;
  // Loop over each pixel and set pixel values.
  var pix_index = pix.length - 4;
  for( var i = ColumnCount * GeneratorRowCount; i < CurrentImageData.length; i ++ )
  {
    
    pix[pix_index  ] = Math.floor( CurrentImageData[ i ] * 256 ); // red channel
 
    var rand = parseInt(Math.random() * 20);
    if (rand < 5) {
    
    }
    else {
      pix[pix_index +1 ] = Math.floor( CurrentImageData[ i ] * ((56 / 20) * rand) ); // red channel
    }
    pix_index -= 4;
  }
 
  var context = document.getElementById( 'sheetFireCanvas' ).getContext( '2d' );
  context.save( );
  context.putImageData( FlameImage, 0, 0 );
 
  context.restore( );
}
 
function initializeSheetFire()
{
  var i;
  canvas = document.getElementById( 'sheetFireCanvas' );
  if( canvas.getContext )
  {
    ImageHeight = canvas.height;
    RowCount = ImageHeight + GeneratorRowCount;
    ColumnCount = canvas.width;
 
    FlameImage = canvas.getContext( '2d' ).createImageData( ColumnCount, ImageHeight );
    var pix = FlameImage.data;
    for( i = 0; i < pix.length; i += 4 )
    {
    
      pix[i  ] = 200; // red channel
      pix[i + 1] = 0;
      pix[i + 2] = 0;
      pix[i + 3] = 255;
    /*
      pix[i  ] = 0; // red channel
      pix[i + 1] = 0;
      pix[i + 2] = 0;
      pix[i + 3] = 255;
      */
    }
    ImageData = new Array( 2 );
    for( var image_index = 0; image_index < 2; image_index++ )
    {
      var data = new Array( RowCount * ColumnCount );
      ImageData[image_index] = data;
      for( i = 0; i < data.length; i ++ )
      {
        data[i] = 0;
      }
    }
    CurrentImageIndex = 0;
    sheetFire( );
    setInterval( 'sheetFire()', 100 );
  }
}