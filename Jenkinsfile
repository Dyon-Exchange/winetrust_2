pipeline {
    agent { docker { image 'node:16-alpine' } }
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
            }
        }
    }
}


// pipeline {
//     agent {
//         docker {
//             image 'node:16-alpine'
//             args '-p 3000:3000'
//         }
//     }
// stages {
//     stage('Build') {
//         steps {
//             sh 'yarn install'
//         }
//     }
// }
// }
