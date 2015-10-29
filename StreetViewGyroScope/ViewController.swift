//
//  ViewController.swift
//  StreetViewGyroScope
//
//  Created by Eric Smith on 10/27/15.
//  Copyright © 2015 Eric Smith. All rights reserved.
//

import UIKit
import GoogleMaps

class ViewController: UIViewController, GMSMapViewDelegate {
    
    override func loadView() {
        var panoView = GMSPanoramaView(frame: CGRectZero)
        self.view = panoView
        print("Test")
        
        panoView.moveNearCoordinate(CLLocationCoordinate2DMake(-33.732, 150.312))
    }
    
    
}

