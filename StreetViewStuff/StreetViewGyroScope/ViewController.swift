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
    var pitchNum = 0.0
    var prevPitchNum = 0.0
    var motionManager = CMMotionManager()
    //var offset = 1
    override func loadView() {
       
        
        var panoView = GMSPanoramaView(frame: CGRectZero)
        self.view = panoView
        panoViewer = panoView
        print("Test")
        
        
        panoView.moveNearCoordinate(CLLocationCoordinate2DMake(43.0729018, -89.3977044))
        panoView.camera = GMSPanoramaCamera(heading: 180, pitch: 0, zoom: 1)
        //heading = 180
        //super.loadView()
    }
    
   /* override func viewWillAppear(animated: Bool) {
       // UIView.setAnimationsEnabled(false)
        let value = UIInterfaceOrientation.LandscapeLeft.rawValue
        UIDevice.currentDevice().setValue(value, forKey: "orientation")
    }*/
    
    override func viewDidAppear(animated: Bool) {
        UIView.setAnimationsEnabled(false)
    }
    
    override func shouldAutorotate() -> Bool {
        return  false
    }
    
    override func supportedInterfaceOrientations() -> UIInterfaceOrientationMask {
        return UIInterfaceOrientationMask.LandscapeRight
    }
    override func viewDidLoad() {
        
        //We need to take care of what happens when the user is using their phone upside down versus right side up
        //This needs ot be taken care of for the x, and y axis
        
        let value = UIInterfaceOrientation.LandscapeRight.rawValue
        UIDevice.currentDevice().setValue(value, forKey: "orientation")
        
        motionManager.gyroUpdateInterval = 0.2
        motionManager.startGyroUpdatesToQueue(NSOperationQueue.currentQueue()!,
            withHandler: {(gyroData: CMGyroData?, error: NSError?) -> Void in
           
            //Set up heading Vars
            self.prevheadingNum = self.headingNum
            var gyroX = (gyroData?.rotationRate.x)! * 10.0
            self.headingNum = self.headingNum + gyroX
                
            //Set up Rotation Vars
            self.prevPitchNum = self.pitchNum
            var gyroY = (gyroData?.rotationRate.y)! * 5.0
            self.pitchNum = self.pitchNum + gyroY
                
            //Figure out the exact value here
            
            if(fabs(self.headingNum - self.prevheadingNum) > 0.1){
                print("Gyro DATA: ")
                /*print("HeadingNum: " + String(format: "%f", self.headingNum))
                print("Previous Heading Num: " + String(format: "%f", self.prevheadingNum))
                print("Pitch: " + String(format: "%f", self.pitchNum))
                print("Previous Pitch: " + String(format:"%f", self.prevPitchNum))*/
                print("Raw Gyro Data X: " + String(format: "%f", (gyroData?.rotationRate.x)!))
                print("Modified Gyro Data X:" + String(format: "%f", gyroX))
                print("**********************")
                
                let cam = GMSPanoramaCamera(heading: -self.headingNum , pitch: -self.pitchNum, zoom: 1)
                self.panoViewer?.animateToCamera(cam, animationDuration: 0.1)
            }
        
            
            
            //Determine what an acceptable rotational change is
            //Smooth out the heading for the GMS PanoramaCamera
            //What is a "signigicant" gyroscope change
        
        })
        
        super.viewDidLoad()
    }
    
    override func viewDidDisappear(animated: Bool) {
        motionManager.stopGyroUpdates();
        print("Stopping Anims")
    }
    
    @IBAction func shiftCamera(sender: AnyObject) {
        headingNum = headingNum + 5
        let cam = GMSPanoramaCamera(heading: headingNum, pitch: 10, zoom: 1)
        
        panoViewer?.animateToCamera(cam, animationDuration: 0.5)
    }
    
}

