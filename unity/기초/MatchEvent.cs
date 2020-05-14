using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MatchEvent : MonoBehaviour
{
    MeshRenderer mesh;
    Material mat;
    void Start()
    {
        mesh = GetComponent<MeshRenderer>();
        mat = mesh.material;
    }

    void OnCollisionEnter(Collision collision)          //충돌시
    {
        if(collision.gameObject.name == "MyBall")
            mat.color = new Color(0, 0, 0);
    }
    void OnCollisionStay(Collision collision)           //충돌중
    {

    }
    void OnCollisionExit(Collision collision)           //충동끝
    {
        if (collision.gameObject.name == "MyBall")
            mat.color = new Color(1, 1, 1);
    }
}
