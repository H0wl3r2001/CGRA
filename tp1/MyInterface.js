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
        this.gui.add(this.scene, 'displayTriangle').name('Our triangle');               //Triangle       - 1.1
        this.gui.add(this.scene, 'displayDiamond').name('Our diamond');                 //Diamond        - 1.2
        this.gui.add(this.scene, 'displayParall').name('Our parallelogram');            //Parallelogram  - 1.4
        this.gui.add(this.scene, 'displayTriangleSmall').name('Our small triangle');    //Small Triangle - 2
        this.gui.add(this.scene, 'displayTriangleBig').name('Our big triangle');        //Big Triangle   - 2
        
        return true;
    }
}