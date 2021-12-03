pipeline {
    agent any
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
            }
        }
    }
}


















//pipeline {
//    agent {
//        docker {
//            image 'node:6-alpine'
//            args '-p 3000:3000'
//        }
//    }
//     environment {
//            CI = 'true'
//        }
//    stages {
//        stage('Build') {
//            steps {
//                sh 'npm --version'
//            }
//        }
//        stage('Test') {
//                    steps {
//                        sh './packages/react-app/package.json'
//                    }
//                }
//    }
//}


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
