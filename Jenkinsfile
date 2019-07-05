def runCommand(String command) {
    return (sh(returnStdout: true, script: command)).trim()
}

def useNodeJs(String nodeVersion = '', String npmVersion = '') {
    if (!nodeVersion) {
        nodeVersion = runCommand("python3 -c \"import json; data = json.load(open('package.json')); print(data['engines']['node'])\"");
    }
    if (!npmVersion) {
        npmVersion = runCommand("python3 -c \"import json; data = json.load(open('package.json')); print(data['engines']['npm'])\"");
    }

    def platform = 'linux-x64'
    if (runCommand('uname').contains('Darwin')) {
        platform = 'darwin-x64'    
    }

    def nodeJsToolDir = "runtime"
    def binPath = "${nodeJsToolDir}/node-v${nodeVersion}-${platform}/bin"
    env.PATH = "${binPath}:${env.PATH}"

    if (!fileExists(nodeJsToolDir)) {
        sh "mkdir -p ${nodeJsToolDir}"
    }

    if (!fileExists(binPath)) {
        sh "cd ${nodeJsToolDir}; curl -LO \"https://nodejs.org/dist/v${nodeVersion}/node-v${nodeVersion}-${platform}.tar.gz\""
        sh "cd ${nodeJsToolDir}; tar xvf \"node-v${nodeVersion}-${platform}.tar.gz\""
        sh "cd ${nodeJsToolDir}; rm \"node-v${nodeVersion}-${platform}.tar.gz\""
        sh "PATH=\"${binPath}:\$PATH\" npm i -g \"npm@${npmVersion}\";"
    }
}

properties([
    buildDiscarder(
        logRotator(
            artifactDaysToKeepStr: '10',
            artifactNumToKeepStr: '10',
            daysToKeepStr: '10',
            numToKeepStr: '10'
        )
    ),
    disableConcurrentBuilds()
])

node('nodejs') {
    dir('build') {
        stage('checkout') {
            checkout scm
        }

        stage('npm install') {
            useNodeJs()
            sh "npm install --ignore-scripts"
        }

        stage('test') {
            sh "npm test"
        }

        stage('build') {
            sh "npm run build"
        }
    }
    cleanWs()
}
