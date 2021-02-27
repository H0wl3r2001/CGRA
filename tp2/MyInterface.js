import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        //Object checkbox elements in GUI
        
        this.gui.add(this.scene, 'displayDiamond').name('Our head');        //Head
        this.gui.add(this.scene, 'displayParall').name('Left ear');         //1st ear
        this.gui.add(this.scene, 'displayTriangle').name('2nd ear');        //2nd ear
        this.gui.add(this.scene, 'displayTriangleSmall1').name('Arm 1');    //Arm 1
        this.gui.add(this.scene, 'displayTriangleSmall2').name('Arm 2');    //Arm 2
        this.gui.add(this.scene, 'displayTriangleBig1').name('Leg 1');              //Leg 1
        this.gui.add(this.scene, 'displayTriangleBig2').name('Leg 2');              //Leg 1
        
        return true;
    }
}