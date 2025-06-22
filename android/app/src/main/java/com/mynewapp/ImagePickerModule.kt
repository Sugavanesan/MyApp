package com.mynewapp

import android.app.Activity
import android.content.ContentValues
import android.content.Intent
import android.net.Uri
import android.provider.MediaStore
import com.facebook.react.bridge.*

class ImagePickerModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), ActivityEventListener {

    private var promise: Promise? = null
    private val CAMERA_REQUEST_CODE = 54321
    private var imageUri: Uri? = null

    init {
        reactContext.addActivityEventListener(this)
    }

    override fun getName(): String = "ImagePickerModule"

    @ReactMethod
    fun openImagePicker(promise: Promise) {
        val activity = currentActivity


        if (activity == null) {
            promise.reject("ACTIVITY_NULL", "Current activity is null")
            return
        }

        this.promise = promise

        val intent = Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI)
        activity.startActivityForResult(intent, 12345)
    }

    @ReactMethod
    fun openCamera(promise: Promise) {
        val activity = currentActivity

        if (activity == null) {
            promise.reject("ACTIVITY_NULL", "Current activity is null")
            return
        }

        this.promise = promise

        val contentValues = ContentValues().apply {
            put(MediaStore.Images.Media.TITLE, "New Picture")
            put(MediaStore.Images.Media.DESCRIPTION, "From Camera")
        }

        imageUri = activity.contentResolver.insert(
            MediaStore.Images.Media.EXTERNAL_CONTENT_URI,
            contentValues
        )

        val cameraIntent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
        cameraIntent.putExtra(MediaStore.EXTRA_OUTPUT, imageUri)

        try {
            activity.startActivityForResult(cameraIntent, CAMERA_REQUEST_CODE)
        } catch (e: Exception) {
            promise.reject("CAMERA_ERROR", "Unable to launch camera: ${e.message}")
            this.promise = null
        }
    }

    override fun onActivityResult(
        activity: Activity?,
        requestCode: Int,
        resultCode: Int,
        data: Intent?
    ) {
        if (requestCode == 12345) {
            if (resultCode == Activity.RESULT_OK && data != null) {
                val uri: Uri? = data.data
                promise?.resolve(uri.toString())
            } else {
                promise?.reject("PICKER_CANCELLED", "Image picking cancelled or failed")
            }
        } else if (requestCode == CAMERA_REQUEST_CODE) {
            if (resultCode == Activity.RESULT_OK && imageUri != null) {
                promise?.resolve(imageUri.toString())
            } else {
                promise?.reject("CAMERA_CANCELLED", "Camera capture cancelled or failed")
            }
        }

        promise = null
        imageUri = null
    }

    override fun onNewIntent(intent: Intent?) {}
}
