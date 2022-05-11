
export default class FollowEnemy {
        constructor(enemyMesh, id, speed, scaling, scene) {
            this.enemyMesh = enemyMesh;
            this.id = id;
            this.scene = scene;
            this.scaling = scaling;

            this.enemyMesh.position.x = Math.floor(Math.random()*(300-(-300)+1)+(-300));
            this.enemyMesh.position.z = Math.floor(Math.random()*(300-(-300)+1)+(-300));
            this.enemyMesh.position.y = 20;

            this.enemyMesh.checkCollisions = true;
            this.enemyMesh.BoxImpostor = new BABYLON.PhysicsImpostor( enemyMesh, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 10}, scene);

            let enemyMaterial = new BABYLON.StandardMaterial("followinEnemyMaterial" , scene);

            enemyMaterial.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random())
    
            this.enemyMesh.material = enemyMaterial;

            if(speed)
                this.speed = speed;
            else
                this.speed = 1;
    
            // in case, attach the instance to the mesh itself, in case we need to retrieve
            // it after a scene.getMeshByName that would return the Mesh
            // SEE IN RENDER LOOP !
            enemyMesh.FollowEnemy = this;
    
            // scaling
            //this.enemyMesh.scaling = new BABYLON.Vector3(0.2  , 0.2, 0.2);
    
            // FOR COLLISIONS, let's associate a BoundingBox to the FollowEnemy
    
            // singleton, static property, computed only for the first FollowEnemy we constructed
            // for others, we will reuse this property.
           
        }
    
        move(scene) {
            // as move can be called even before the bbox is ready.
    
            // let's put the FollowEnemy at the BBox position. in the rest of this
            // method, we will not move the FollowEnemy but the BBox instead
           
    
            // follow the superball
            let superball = scene.getMeshByName("heroSuperball");
            // let's compute the direction vector that goes from FollowEnemy to the superball
            let direction = superball.position.subtract(this.enemyMesh.position);
            let distance = direction.length(); // we take the vector that is not normalized, not the dir vector
            //console.log(distance);
    
            let dir = direction.normalize();
            // angle between FollowEnemy and superball, to set the new rotation.y of the FollowEnemy so that he will look towards the superball
            // make a drawing in the X/Z plan to uderstand....
            let alpha = Math.atan2(-dir.x, -dir.z);
            // If I uncomment this, there are collisions. This is strange ?
            //this.bounder.rotation.y = alpha;
    
            this.enemyMesh.rotation.y = alpha;
    
            // let make the FollowEnemy move towards the superball
            // first let's move the bounding box mesh
            if(distance > 10) {
                //a.restart();   
                // Move the bounding box instead of the FollowEnemy....
                this.enemyMesh.moveWithCollisions(dir.multiplyByFloats(this.speed, this.speed, this.speed));
            }
            else {
                //a.pause();
            }   
        }
    
    }
    
    
    