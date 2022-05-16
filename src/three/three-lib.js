import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js'
import { setupHtmlForThree } from './three-ui'

export function runScene() {
  // const isProduction = process.argv[process.argv.indexOf('--mode') + 1] === 'production'

  // const hostUrl = isProduction ? 'https://b1tlite.github.io/dist/' : ''
  const hostUrl = 'https://b1tlite.github.io/dist/'
  const negxUrl = `${hostUrl}assets/negx.jpg`
  const negyUrl = `${hostUrl}assets/negy.jpg`
  const negzUrl = `${hostUrl}assets/negz.jpg`
  const posxUrl = `${hostUrl}assets/posx.jpg`
  const posyUrl = `${hostUrl}assets/posy.jpg`
  const poszUrl = `${hostUrl}assets/posz.jpg`
  const modelUrl = `${hostUrl}assets/model.glb`

  setupHtmlForThree()
  forsePageStartOnTop()

  /**
   * Cursor
   */
  const cursor = {}
  cursor.x = 0
  cursor.y = 0

  window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
  })

  const parameters = getParameters()

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(parameters.sceneBackground)

  /**
   * Sizes
   */
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  }

  setupSceneResize()

  /**
   * Environment map
   */
  setupEnvironment()

  // ADD SPHERE
  const { sphere, sphereMaterial } = getSphere()

  // create model group to combine different transformations on scroll
  let model
  const { avatarGroup, modelGroup } = setupModel()

  const camera = setupCamera()

  const renderer = setupRenderer()

  /**
   * Post processing
   */
  const effectComposer = setupPostProccessing()

  /**
   * Lights
   */
  const { directLight, hemisphereLight, bluePointLight, redPointLight } = setupLight()

  avatarGroup.add(redPointLight, bluePointLight, directLight)

  function setupEnvironment() {
    const cubeTextureLoader = new THREE.CubeTextureLoader()
    const environmentMap = cubeTextureLoader.load([posxUrl, negxUrl, posyUrl, negyUrl, poszUrl, negzUrl])
    environmentMap.encoding = THREE.sRGBEncoding

    scene.environment = environmentMap
  }
  function setupModel() {
    /**
     * Update all materials
     */
    function updateAllMaterials(gltfModel) {
      gltfModel.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          child.material.needsUpdate = true
          // tell to render even if model part is not fitting the camera
          child.frustumCulled = false
          child.castShadow = true
          child.receiveShadow = true

          child.material.needsUpdate = true
          child.material.envMapIntensity = 3
        }
      })
    }

    const modelGroup = new THREE.Group()
    const avatarGroup = new THREE.Group()

    const gltfLoader = new GLTFLoader()
    gltfLoader.load(modelUrl, (gltf) => {
      model = gltf.scene
      model.scale.set(2, 2, 2)
      avatarGroup.add(model)
      avatarGroup.position.y = -2.6
      modelGroup.add(avatarGroup)
      scene.add(modelGroup)

      updateAllMaterials(model)
    })
    return { avatarGroup, modelGroup }
  }

  function setupPostProccessing() {
    const renderTarget = new THREE.WebGLRenderTarget(800, 600, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      encoding: THREE.sRGBEncoding,
    })
    renderTarget.samples = renderer.getPixelRatio() === 1 && renderer.capabilities.isWebGL2 ? 1 : 0

    // Effect composer
    const effectComposer = new EffectComposer(renderer, renderTarget)
    effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    effectComposer.setSize(sizes.width, sizes.height)

    // Render pass
    const renderPass = new RenderPass(scene, camera)
    effectComposer.addPass(renderPass)

    // Glitch pass
    const glitchPass = new GlitchPass()
    glitchPass.goWild = false
    glitchPass.enabled = true
    effectComposer.addPass(glitchPass)

    // RGB Shift pass
    const rgbShiftPass = new ShaderPass(RGBShiftShader)
    rgbShiftPass.uniforms.amount.value = 0.003
    rgbShiftPass.uniforms.angle.value = 3.5
    rgbShiftPass.enabled = true
    effectComposer.addPass(rgbShiftPass)

    // Antialias pass
    if (renderer.getPixelRatio() === 1 && !renderer.capabilities.isWebGL2) {
      const smaaPass = new SMAAPass()
      effectComposer.addPass(smaaPass)

      console.log('Using SMAA')
    }

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    return effectComposer
  }

  function setupLight() {
    const directLight = new THREE.SpotLight(0xff0000, 100, 10, 3)
    directLight.position.set(0, -3, 0.5)
    directLight.castShadow = true
    directLight.shadow.normalBias = 0.05
    directLight.shadow.mapSize.set(256, 256)
    directLight.shadow.camera.far = 5

    const hemisphereLight = new THREE.AmbientLight(0xffffff, 2)
    scene.add(hemisphereLight)

    const bluePointLight = new THREE.PointLight('#0000ff', 14, 20)
    bluePointLight.position.set(2, -2, 3)

    const redPointLight = new THREE.PointLight('#ff0000', 14, 20)
    redPointLight.position.set(1, -2, 3)
    return { directLight, hemisphereLight, bluePointLight, redPointLight }
  }

  function setupRenderer() {
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#bg'),
      antialias: true,
    })
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    renderer.physicallyCorrectLights = true
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.toneMapping = THREE.ReinhardToneMapping
    renderer.toneMappingExposure = 1.5
    return renderer
  }

  function setupCamera() {
    const camera = new THREE.PerspectiveCamera(65, sizes.width / sizes.height, 0.01, 1000)
    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 1
    return camera
  }

  function getSphere() {
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#000000'),
      transparent: true,
      opacity: parameters.sphereOpacity,
      side: THREE.DoubleSide,
    })

    const sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(100, 32, 32), sphereMaterial)
    scene.add(sphere)
    return { sphere, sphereMaterial }
  }

  function setupSceneResize() {
    window.addEventListener('resize', () => {
      // Update sizes
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight

      // Update camera
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()

      // Update renderer
      renderer.setSize(sizes.width, sizes.height)
    })
  }

  function getParameters() {
    const parameters = {}
    parameters.topColor = '#0000ff'
    parameters.bottomColor = '#ff0000'
    parameters.directLightColor = '#ff0000'
    parameters.sceneBackground = '#a20000'
    parameters.modelX = 0
    parameters.modelY = 1.2
    parameters.modelZ = 1
    parameters.cameraNear = 0.01
    parameters.sphereOpacity = 0
    return parameters
  }

  function forsePageStartOnTop() {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0)
    }
  }

  function transformAvatar() {
    const t = document.body.getBoundingClientRect().top
    let range = t * -0.0005

    if (range < 1.4) {
      avatarGroup.rotation.y = -range
      // lift litle bit on y axis
      avatarGroup.position.y = range * 0.5 - 2.6
    }
    avatarGroup.position.z = -range * 1.2
    // overlay red background on scroll
    sphereMaterial.opacity = range * 0.5

    // increase light intensity on scroll
    if (range * 2 > 2) hemisphereLight.intensity = range * 3

    if (range > 0.5 && range < 2) {
      modelGroup.rotation.z = -(range - 0.5)
    }

    if (range > 2 && range < 2.5) avatarGroup.rotation.y = +(range - 2 - 1.4)
  }

  document.body.onscroll = transformAvatar

  /**
   * Animate
   */
  const clock = new THREE.Clock()

  const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    if (model) model.position.y += Math.sin(elapsedTime) * 0.001

    const angle = elapsedTime * 0.5
    bluePointLight.position.x = Math.cos(angle) * 5
    bluePointLight.position.z = Math.abs(Math.sin(angle)) * 4 - 2
    bluePointLight.position.y = Math.sin(angle * 2) + Math.sin(elapsedTime * 2)

    const angle2 = elapsedTime * 0.32
    redPointLight.position.x = Math.cos(angle2) * 5
    redPointLight.position.z = Math.abs(Math.sin(angle2) * 4)
    redPointLight.position.y = Math.sin(angle2 * 3) + Math.sin(elapsedTime * 2.5)

    const parallaxX = cursor.x * 0.05
    const parallaxY = -cursor.y * 0.05
    camera.position.x = parallaxX
    camera.position.y = parallaxY

    // Update controls
    //  controls.update()
    // Render
    renderer.render(scene, camera)
    effectComposer.render()

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
  }

  tick()
}
