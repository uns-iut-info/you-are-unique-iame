import Sphere from "./Sphere.js";


export default class sphereMesh extends Sphere {
    
    constructor(sphereMesh, id, scaling, scene, texture){
        super(sphereMesh,id,scaling,scene,texture);
        sphereMesh.position.x = 0;
        //sphereMesh.position.y = 5;     
        sphereMesh.position.z = 0;
        sphereMesh.speed = 4;
        sphereMesh.frontVector = new BABYLON.Vector3(0, 0, 1);
        
        /*sphereMesh.onCollideObservable.add(function () {
            alert("collideObservable work!");
        });*/

    }

    move(target) {}

}