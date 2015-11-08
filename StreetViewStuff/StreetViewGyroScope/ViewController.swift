//
//  ViewController.swift
//  StreetViewGyroScope
//
//  Created by Eric Smith on 10/27/15.
//  Copyright © 2015 Eric Smith. All rights reserved.
//

import UIKit
import GoogleMaps
import CoreMotion

class ViewController: UIViewController, GMSMapViewDelegate {
    
    var panoViewer: GMSPanoramaView?
    var headingNum = 180.0
    var prevheadingNum = 180.0
    var pitchNum = 10.0
    var prevPitchNum = 10.0
    var motionManager = CMMotionManager()
    //var offset = 1
    override func loadView() {
       
        
        var panoView = GMSPanoramaView(frame: CGRectZero)
        self.view = panoView
        panoViewer = panoView
        print("Test")
        
        
        panoView.moveNearCoordinate(CLLocationCoordinate2DMake(-33.732, 150.312))
        panoView.camera = GMSPanoramaCamera(heading: 180, pitch: -10, zoom: 1)
        //heading = 180
        //super.loadView()
    }
    
    override func viewDidLoad() {
        motionManager.gyroUpdateInterval = 0.2
        motionManager.startGyroUpdatesToQueue(NSOperationQueue.currentQueue()!,
            withHandler: {(gyroData: CMGyroData?, error: NSError?) -> Void in
           
            //Set up heading Vars
            self.prevheadingNum = self.headingNum
            var gyroX = (gyroData?.rotationRate.x)! * 10.0
            self.headingNum = self.headingNum + gyroX
                
            //Set up Rotation Vars
            self.prevPitchNum = self.pitchNum
            var gyroY = (gyroData?.rotationRate.y)! * 10.0
            self.pitchNum = self.pitchNum + gyroY
                
            //Figure out the exact value here
            if(fabs(self.headingNum - self.prevheadingNum) > 0.1){
                print("Gyro DATA: ")
                print("HeadingNum: " + String(format: "%f", self.headingNum))
                print("Previous Heading Num: " + String(format: "%f", self.prevheadingNum))
                print("Pitch: " + String(format: "%f", self.pitchNum))
                print("Previous Pitch: " + String(format:"%f", self.prevPitchNum))
                print("**********************")
                
                let cam = GMSPanoramaCamera(heading: self.headingNum , pitch: self.pitchNum, zoom: 1)
                self.panoViewer?.animateToCamera(cam, animationDuration: 0.1)
            }
        
            
            
            //Determine what an acceptable rotational change is
            //Smooth out the heading for the GMS PanoramaCamera
            //What is a "signigicant" gyroscope change
        
        })
        
        super.viewDidLoad()
    }
    
    @IBAction func shiftCamera(sender: AnyObject) {
        headingNum = headingNum + 5
        let cam = GMSPanoramaCamera(heading: headingNum, pitch: 10, zoom: 1)
        
        panoViewer?.animateToCamera(cam, animationDuration: 0.5)
    }
    
}

