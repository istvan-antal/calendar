@Library('pipeline') _

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