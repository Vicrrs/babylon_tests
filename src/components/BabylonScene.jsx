'use client';

import { useEffect, useRef } from 'react';
import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { SceneLoader } from '@babylonjs/core';
import { Animation } from '@babylonjs/core/Animations/animation';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { ActionManager, ExecuteCodeAction } from '@babylonjs/core/Actions';
import '@babylonjs/loaders/OBJ/objFileLoader';

const BabylonScene = ({ objPath }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            const engine = new Engine(canvasRef.current, true);
            const scene = new Scene(engine);
            const camera = new ArcRotateCamera('camera1', Math.PI / 2, Math.PI / 4, 10, Vector3.Zero(), scene);
            camera.attachControl(canvasRef.current, true);
            camera.wheelPrecision = 50;
            const light = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);

            SceneLoader.ImportMesh("", "/mesh.obj", "", scene, (newMeshes) => {
                scene.activeCamera.target = newMeshes[0].position;

                // Coordenadas ajustadas para o ponto específico sobre a mesa/computadores
                const point = new Vector3(0, 0, 0); // Ajuste conforme necessário para a posição correta
                const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 0.2 }, scene);
                sphere.position = point;
                sphere.actionManager = new ActionManager(scene);
                sphere.actionManager.registerAction(new ExecuteCodeAction(
                    ActionManager.OnPickTrigger,
                    () => {
                        moveCameraTo(point);
                    }
                ));
            });

            engine.runRenderLoop(() => {
                scene.render();
            });

            window.addEventListener('resize', () => {
                engine.resize();
            });

            const moveCameraTo = (targetPosition) => {
                const animation = new Animation(
                    "cameraAnimation",
                    "position",
                    30,
                    Animation.ANIMATIONTYPE_VECTOR3,
                    Animation.ANIMATIONLOOPMODE_CONSTANT
                );

                const keys = [
                    { frame: 0, value: camera.position },
                    { frame: 100, value: targetPosition },
                ];

                animation.setKeys(keys);
                camera.animations.push(animation);
                scene.beginAnimation(camera, 0, 100, false);
            };

            return () => {
                window.removeEventListener('resize', () => {
                    engine.resize();
                });
                engine.dispose();
            };
        }
    }, []);

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};

export default BabylonScene;
