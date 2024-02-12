const crypto = require("crypto");

const images = {
  bg: {
    seeingDouble: "https://i.postimg.cc/HxhXYXj2/double-Trouble.webp",
    ahhhhhh: "https://i.postimg.cc/Gm1Ppjgq/ahhBG.webp",
    racing: "https://i.postimg.cc/DzjCwcwW/race-Track.webp",
    ping: "https://i.postimg.cc/QNckCGmG/jewel-BG-16by9.webp",
  },
  me: [
    "https://i.postimg.cc/g2TM7XHv/katpcha-me-1885d2d7-2f3c-4c6b-9e5e-66d6f2930fd9.webp",
    "https://i.postimg.cc/SxsTV7CS/katpcha-me-48241573-1ef7-4517-972d-d8b20a109933.webp",
    "https://i.postimg.cc/SKYZbSgH/katpcha-me-4f5b97e0-c52a-46b5-a23f-261eb77569eb.webp",
    "https://i.postimg.cc/zXp2nPL2/katpcha-me-5370dc0a-70bf-47d6-8461-e698b8267e9a.webp",
    "https://i.postimg.cc/SQ6vKKmh/katpcha-me-6a66b540-2138-446f-bba8-78fea18d57d4.webp",
    "https://i.postimg.cc/3RMtKs6N/katpcha-me-783ab412-f563-4c1c-bf86-ad400495e541.webp",
    "https://i.postimg.cc/RFcXqP5R/katpcha-me-b385c171-ccb4-4da0-a801-ad6f237a55c2.webp",
    "https://i.postimg.cc/gkGBLP06/katpcha-me-f00cf0be-0c8e-46ff-bad0-2d66b1b323dc.webp",
  ],
  mee: [
    "https://i.postimg.cc/c4d44gMf/katpcha-me-4c06e030-5695-457c-b800-dfcb157c6737.webp",
    "https://i.postimg.cc/7YXPCHmd/katpcha-me-6da2c8b0-1419-4f45-98be-fa86513c4128.webp",
    "https://i.postimg.cc/TP5THrfv/katpcha-me-7d0b106d-ecd0-4831-a8e9-7ae9d8d08ef1.webp",
    "https://i.postimg.cc/W13NgBy3/katpcha-me-85ca6502-f638-4262-80cf-c14b8e584c59.webp",
    "https://i.postimg.cc/QtphjhF6/katpcha-me-9de65c49-027e-49eb-9e48-8453d38c4938.webp",
    "https://i.postimg.cc/JnwRwGzD/katpcha-me-c3855a30-1181-4f8e-b29c-8b176e57ea97.webp",
    "https://i.postimg.cc/pL62Z0NB/katpcha-me-c6a87095-f715-47c1-96c6-378d9fb54341.webp",
    "https://i.postimg.cc/v8tbj8FT/katpcha-me-dc757645-9d70-4bd8-a069-95ec5f4ecd6c.webp",
  ],
  meee: [
    "https://i.postimg.cc/tg7ndd9G/katpcha-me-2e8d60e3-486e-4bd1-bbb9-35b88629a6f6.webp",
    "https://i.postimg.cc/Jnkyv1yT/katpcha-me-62525271-d051-4011-9844-16e118b23f5b.webp",
    "https://i.postimg.cc/d0Xk570k/katpcha-me-8f168fe3-3ed3-4cbe-95f8-1547b47d08f2.webp",
    "https://i.postimg.cc/wMYtdSL9/katpcha-me-99a9c8c9-102a-4f69-b8b8-e2e6fcb49432.webp",
    "https://i.postimg.cc/FF0dxHXz/katpcha-me-a50d651b-408b-43fd-84e0-e1188820b099.webp",
    "https://i.postimg.cc/SNqX1bmr/katpcha-me-aa202be5-dc52-4069-b29b-9798c2e722e9.webp",
    "https://i.postimg.cc/QxbFRYtr/katpcha-me-b76dd6cd-1619-4835-91f4-8d8a8a39a375.webp",
    "https://i.postimg.cc/6qV86Yfn/katpcha-me-c100b297-d6f5-4bcb-b8b5-f1ab3cb13c24.webp",
  ],
  meeee: [
    "https://i.postimg.cc/WzcV3V5f/katpcha-me-17e4ad47-9d0e-4e5d-b02e-259c129fb473.webp",
    "https://i.postimg.cc/rpbcBxxT/katpcha-me-436a8856-6dc2-4229-8461-6327fa2e7b0d.webp",
    "https://i.postimg.cc/mDHRBkyH/katpcha-me-4f63dd63-0b8d-4bc6-9d40-0ba515ce6960.webp",
    "https://i.postimg.cc/Cxcw4WKz/katpcha-me-593d0fdf-2683-4d4e-a392-c6f2ef65005c.webp",
    "https://i.postimg.cc/SN7SnXFL/katpcha-me-ac149974-1dd4-4b2a-9a12-91ec543ee100.webp",
    "https://i.postimg.cc/vZYQfQbJ/katpcha-me-ae261cd4-b1ec-4ee7-8a9e-2021d6f3bf37.webp",
    "https://i.postimg.cc/FK1NCDfG/katpcha-me-aea2b5c9-18fa-4c5b-a800-ecec5b4110ab.webp",
    "https://i.postimg.cc/J4W77Ng4/katpcha-me-f238a6ef-71c9-4a3c-b82d-9ef8248d3cb6.webp",
  ],
  ping: [
    "https://i.postimg.cc/xCC82YcD/katpcha-me-05539794-4152-4d0d-8b44-f49fff4cfe69.webp",
    "https://i.postimg.cc/NGn9Qy6N/katpcha-me-1b795ca0-9ce4-4634-a18e-e2913aa8e74b.webp",
    "https://i.postimg.cc/wMn72PxK/katpcha-me-86c63577-dc26-4c06-b537-7c4e2d1457db.webp",
    "https://i.postimg.cc/vmGD05ym/katpcha-me-b7bfd0c3-ac17-4d66-939b-4af51cd498e1.webp",
    "https://i.postimg.cc/4xkYhrFV/katpcha-me-bc859376-f6c9-4153-945a-d131387e5d13.webp",
    "https://i.postimg.cc/zXRLvJpq/katpcha-me-cc761a94-1feb-4c31-b4f3-6373f5fdaf58.webp",
    "https://i.postimg.cc/Kj11nF2r/katpcha-me-dc81c394-a48e-4ba1-9c16-9ab5d25f223c.webp",
    "https://i.postimg.cc/8zRjdtq3/katpcha-me-e2e1008d-9b8e-4ac6-917a-d9685f3152d7.webp",
  ],
  pointA: [
    "https://i.postimg.cc/ydXy7kcp/katpcha-me-21e486e9-dda0-4071-b22a-bd16b48f714f.webp",
    "https://i.postimg.cc/4yfbys1f/katpcha-me-33ba72f1-cfe6-4c4f-ad2e-7325da7595c3.webp",
    "https://i.postimg.cc/fRpKC4MC/katpcha-me-5bb684e2-e2a1-4b1f-a99d-3d09993b5d49.webp",
    "https://i.postimg.cc/hGm03CjB/katpcha-me-6ed3a651-4a99-4e97-9fb9-4410786d482b.webp",
    "https://i.postimg.cc/tTHz0hZV/katpcha-me-7bb83c94-712e-40a1-92d9-1f3ec9e77d4f.webp",
    "https://i.postimg.cc/nV2G59HC/katpcha-me-c582220b-5823-4c48-9009-b02c842045c0.webp",
    "https://i.postimg.cc/vHmtd8BX/katpcha-me-d35af172-e9bf-499a-84b2-eb3b45f6f45a.webp",
    "https://i.postimg.cc/8cZdr9yh/katpcha-me-ebad6d96-8850-45d0-8326-f48ef71aed57.webp",
  ],
  pointB: [
    "https://i.postimg.cc/Kj8BFQZ4/katpcha-me-04975e4d-e1f0-4803-a6ec-83d51f80c603.webp",
    "https://i.postimg.cc/FFT0GtZS/katpcha-me-464a081f-8373-48e8-a6b4-a0db5d7f1739.webp",
    "https://i.postimg.cc/26mn9rMQ/katpcha-me-57a87c4f-4bc9-4a3d-871e-6f02a6fc274a.webp",
    "https://i.postimg.cc/Kv4BH9qH/katpcha-me-6e739cb9-4c48-4360-9e6a-f1c868799251.webp",
    "https://i.postimg.cc/R0wcTNsC/katpcha-me-81d07419-be04-4b82-981b-40818b622ac6.webp",
    "https://i.postimg.cc/QxP1Gpvx/katpcha-me-912fde71-6776-44c8-9599-41d5aef7032d.webp",
    "https://i.postimg.cc/KjpLYLzf/katpcha-me-d6aa887e-a8f7-4cea-a718-fab4da0b66e7.webp",
    "https://i.postimg.cc/cHmwVPGV/katpcha-me-e09950f4-e58d-4f7a-8aeb-e794a09a8976.webp",
  ],
  pointC: [
    "https://i.postimg.cc/g2S07zh8/katpcha-me-193227b0-e8aa-4e78-8e18-cd70f895c213.webp",
    "https://i.postimg.cc/hP0v9bPC/katpcha-me-370e30de-73bd-4ced-a5f7-901932ccba70.webp",
    "https://i.postimg.cc/RCKN0zrx/katpcha-me-391f7cd6-b9e2-45a5-8f05-1d5f1f2c07bb.webp",
    "https://i.postimg.cc/65KT21w2/katpcha-me-54fe0038-0fca-4628-8266-f4ea6aa7e2b7.webp",
    "https://i.postimg.cc/767YbSWn/katpcha-me-84128309-3a41-40e4-b9ab-37d4082e42a5.webp",
    "https://i.postimg.cc/FKYK5Mbq/katpcha-me-baf3ad27-3c9b-4406-bea5-532d1e38e7fe.webp",
    "https://i.postimg.cc/4xNdw7YX/katpcha-me-f2c4d651-28b9-43d8-85fd-a3990676b122.webp",
    "https://i.postimg.cc/YSTCpdbS/katpcha-me-f3b129f2-4f48-405e-a880-5610bb80cc94.webp",
  ],
  pointD: [
    "https://i.postimg.cc/nzMhx6vg/katpcha-me-2cbfd4ff-3595-44c6-828a-f2672cdb1fea.webp",
    "https://i.postimg.cc/7LKZpxTS/katpcha-me-4578465e-13dd-477b-9d60-1683fa38bac7.webp",
    "https://i.postimg.cc/yWC1FxwC/katpcha-me-993a84f8-8b85-4802-abe2-7c06bfa3a39b.webp",
    "https://i.postimg.cc/QN216bDh/katpcha-me-a7e1861b-f46c-4149-87f2-dc94bc67eeb2.webp",
    "https://i.postimg.cc/XNG9cPTs/katpcha-me-b3b5a173-e41c-4b86-bfcd-4e57e985c376.webp",
    "https://i.postimg.cc/TYnmBD2m/katpcha-me-bf89a555-eb77-4fcb-af40-1091b62fa584.webp",
    "https://i.postimg.cc/V6TLkDg6/katpcha-me-d89e4875-f0b6-4934-b20a-f927aaa6c530.webp",
    "https://i.postimg.cc/sxhfQ7HJ/katpcha-me-f624979b-b692-4e5d-b765-3bcf787bd86d.webp",
  ],
  pointF: [
    "https://i.postimg.cc/k5XMW7FV/katpcha-me-31d208b2-86ad-4e10-8479-67233f6201f5.webp",
    "https://i.postimg.cc/qvGMtNnV/katpcha-me-41695bd5-5135-47de-beb4-4bf427085985.webp",
    "https://i.postimg.cc/BZ86hQWH/katpcha-me-83ca008c-1d39-4c11-a2e9-49b6bd6de121.webp",
    "https://i.postimg.cc/9FZfh8Qf/katpcha-me-8d3221ca-67fb-4ce1-a270-50f2d6b58e9a.webp",
    "https://i.postimg.cc/kgCgXQ2v/katpcha-me-a1dd0f2a-6445-4708-bf13-6183b24fa4e4.webp",
    "https://i.postimg.cc/g0SzD1Ng/katpcha-me-b438238c-2729-4e9c-8e80-53fb48abb3ef.webp",
    "https://i.postimg.cc/j5Dskv1t/katpcha-me-de0f5450-85cf-4485-82fb-2a255007491a.webp",
    "https://i.postimg.cc/KcdYCSFV/katpcha-me-f766d63e-03ea-472c-a599-6aa5a4c046c8.webp",
  ],
  pointFF: [
    "https://i.postimg.cc/g0GNGTyq/katpcha-me-2c9fc8f1-e971-4442-8739-3d2aa3550556.webp",
    "https://i.postimg.cc/brSR6c88/katpcha-me-3f0d7363-131e-46ac-b7ae-e353525311d9.webp",
    "https://i.postimg.cc/zBB7gHcy/katpcha-me-5b37b654-3ef2-4115-a652-545e09c91ac1.webp",
    "https://i.postimg.cc/h4JWFXt4/katpcha-me-677db85a-7923-4900-9754-c65e4be7074b.webp",
    "https://i.postimg.cc/XNTMnnrf/katpcha-me-85a4cfef-3dba-4ee5-85e7-973e1102bc4d.webp",
    "https://i.postimg.cc/hGMMv1pF/katpcha-me-97c2917d-10bc-4fa0-9f6b-1d062e942ae8.webp",
    "https://i.postimg.cc/Hxh24WqB/katpcha-me-af001030-771b-43e1-a27b-1f8e84ca8582.webp",
    "https://i.postimg.cc/dDMjpHtC/katpcha-me-d5f20291-a44d-40ce-a2a4-794cf59989e8.webp",
  ],
  pointG: [
    "https://i.postimg.cc/nVd4mL4m/katpcha-me-06534eb7-0dd5-4f9d-aa5e-11d2c9cf93e1.webp",
    "https://i.postimg.cc/sx05Cnjm/katpcha-me-1b3dedb0-185d-48ad-857c-908c84fd8da6.webp",
    "https://i.postimg.cc/jSfPBQG6/katpcha-me-454d1a15-0dbc-49c3-899c-5219662ec3bf.webp",
    "https://i.postimg.cc/JhcJz77G/katpcha-me-572be08f-e96e-473a-8ed9-3b9d6a358745.webp",
    "https://i.postimg.cc/jdmy8kkd/katpcha-me-7cf5de79-72ca-41df-b3e6-7bcb9e596bb4.webp",
    "https://i.postimg.cc/CLzjsV7Q/katpcha-me-b5f28960-818b-417a-8692-cb1ad3a56bfb.webp",
    "https://i.postimg.cc/XJj5GMXx/katpcha-me-c08eeb8c-822a-478a-8c2d-6ec99e603b34.webp",
    "https://i.postimg.cc/pdtzv5Hw/katpcha-me-cc64ae6d-8dda-4b0f-9df8-65fd065666f6.webp",
  ],
  pointGG: [
    "https://i.postimg.cc/dtxg5wYk/katpcha-me-4b4a7edc-a60c-4eb8-b769-86e8bce0d8d7.webp",
    "https://i.postimg.cc/Zqk2hH0J/katpcha-me-61005410-5b1e-4a41-96e7-c35a5b0cc36e.webp",
    "https://i.postimg.cc/ZqrgYNyp/katpcha-me-62ed42e9-9b4e-41d2-8a52-a5b075249a48.webp",
    "https://i.postimg.cc/sXsLM2p8/katpcha-me-aea5c6b9-51d1-4f1a-9c1d-f3707654119b.webp",
    "https://i.postimg.cc/Tw04gX0P/katpcha-me-bdc75d9c-199d-49b4-bf83-31a775d15d11.webp",
    "https://i.postimg.cc/Z5v2g2bf/katpcha-me-bef29e05-53e7-4ade-b2ce-4743c8745f41.webp",
    "https://i.postimg.cc/fygqqj6n/katpcha-me-ec071831-fef6-4915-8e00-7354a7929ef6.webp",
    "https://i.postimg.cc/0jNHCHX0/katpcha-me-f1682e3e-053a-4366-9353-80945c638ad5.webp",
  ],
  pointI: [
    "https://i.postimg.cc/JnfDmnvD/katpcha-me-1574f467-2d70-4be8-bb92-288cd07c6978.webp",
    "https://i.postimg.cc/8PBJQTHc/katpcha-me-2696df4b-42ec-48ce-8e95-26fcd1d905f5.webp",
    "https://i.postimg.cc/KjtKYbh9/katpcha-me-3e4cb2d0-673d-4e4b-894e-214a402499cf.webp",
    "https://i.postimg.cc/6pW7BFj0/katpcha-me-428086fd-5b88-4145-bfe2-07eaab47609d.webp",
    "https://i.postimg.cc/mZ91jY1Q/katpcha-me-7b146194-f659-4e94-82ee-f34e065bd644.webp",
    "https://i.postimg.cc/PrkpRC10/katpcha-me-9bbc5edb-7873-4017-90b3-ebca9834fbee.webp",
    "https://i.postimg.cc/XvXpCd0B/katpcha-me-bbc4e208-8335-40d3-a553-1533c1110ba9.webp",
    "https://i.postimg.cc/t4BsJD8H/katpcha-me-f752200c-fa24-4ea8-b012-72ff40feca7a.webp",
  ],
  pointJ: [
    "https://i.postimg.cc/9QsjL777/katpcha-me-05539794-4152-4d0d-8b44-f49fff4cfe69.webp",
    "https://i.postimg.cc/rFFcscTK/katpcha-me-1b795ca0-9ce4-4634-a18e-e2913aa8e74b.webp",
    "https://i.postimg.cc/1z6123GY/katpcha-me-86c63577-dc26-4c06-b537-7c4e2d1457db.webp",
    "https://i.postimg.cc/tRzp9JLK/katpcha-me-b7bfd0c3-ac17-4d66-939b-4af51cd498e1.webp",
    "https://i.postimg.cc/Vv48gZqf/katpcha-me-bc859376-f6c9-4153-945a-d131387e5d13.webp",
    "https://i.postimg.cc/rsqTS2tZ/katpcha-me-cc761a94-1feb-4c31-b4f3-6373f5fdaf58.webp",
    "https://i.postimg.cc/7Z5k1Vf4/katpcha-me-dc81c394-a48e-4ba1-9c16-9ab5d25f223c.webp",
    "https://i.postimg.cc/5N7JFG9p/katpcha-me-e2e1008d-9b8e-4ac6-917a-d9685f3152d7.webp",
  ],
  pointBW: [
    "https://i.postimg.cc/VNHktRw7/kaptcha-me-14ed13c2-9420-4e52-b9fc-5618ea9590bc.webp",
    "https://i.postimg.cc/RFkCsZNK/kaptcha-me-188e3561-6700-487b-a52e-5867904034b4.webp",
    "https://i.postimg.cc/wBBB3rCy/kaptcha-me-91568605-2253-4882-9af6-f6052e3fc801.webp",
    "https://i.postimg.cc/JnD45k4R/kaptcha-me-97528219-1872-48f3-8995-e2845d07cb3a.webp",
    "https://i.postimg.cc/Vkg6fwVP/kaptcha-me-9f93f269-9de7-4e7f-904a-cfa1733e96a6.webp",
    "https://i.postimg.cc/Z54nznjL/kaptcha-me-b29bb59b-7525-44cd-9682-f3896aecf3e1.webp",
    "https://i.postimg.cc/RVchYK1F/kaptcha-me-ba918840-cb20-4623-88e6-7a876528baf7.webp",
    "https://i.postimg.cc/9F3z1J7K/kaptcha-me-d704ce9a-fba6-49b0-917c-b2afb3954a0d.webp",
  ],
  pointBW_R: [
    "https://i.postimg.cc/RCTPGCJ3/katpcha-me-48f944b0-2d77-42a1-b315-78ce3606cff5.webp",
    "https://i.postimg.cc/Qt3bkvXk/katpcha-me-6091c655-6716-470d-9fe2-e992aa90a5c5.webp",
    "https://i.postimg.cc/y8DvVFQ9/katpcha-me-c9539867-a2b3-49cf-98df-d5cad45db5c6.webp",
    "https://i.postimg.cc/pL3kyp4S/katpcha-me-d6d390b0-0329-459c-b1e7-b061279c5259.webp",
    "https://i.postimg.cc/7YsK8BVw/katpcha-me-d7f7b035-cba4-4531-8b93-48220c011a44.webp",
    "https://i.postimg.cc/9MYBx103/katpcha-me-d8f31b88-9469-410e-b245-465a8499bc39.webp",
    "https://i.postimg.cc/Hss6NGb6/katpcha-me-f334199b-abbe-43aa-95c9-d0bb722e552a.webp",
    "https://i.postimg.cc/hGxsmKqt/katpcha-me-f8ee87e5-ac90-4824-b02f-90399cd285d7.webp",
  ],
  pointBW_L: [
    "https://i.postimg.cc/RFTZNJsQ/katpcha-me-20e5be1e-7cdc-4989-bb57-027101bd1c8d.webp",
    "https://i.postimg.cc/9XJf2Tqc/katpcha-me-409735a2-883d-452d-a31c-9db592a1887b.webp",
    "https://i.postimg.cc/HxmLY92k/katpcha-me-42a586d3-57b0-4c8d-a969-321dcbab300c.webp",
    "https://i.postimg.cc/15d5nQHT/katpcha-me-48c107b7-2b83-4e9c-a1e4-da0ee0db93f4.webp",
    "https://i.postimg.cc/GthhY360/katpcha-me-517eaa2f-2b9c-4001-a43f-2f0d5bdc996d.webp",
    "https://i.postimg.cc/cC91cyNv/katpcha-me-8641555e-b7a8-4fc1-b9b3-f815c8d0b9a7.webp",
    "https://i.postimg.cc/y8S60bpN/katpcha-me-d1fb76d7-9929-4cf7-a0e2-9e7b173de651.webp",
    "https://i.postimg.cc/4NyxxdzV/katpcha-me-e9bb8599-cad7-4039-a17b-4ae0ffa5e65e.webp",
  ],
};

/**
 * Return a random integer between 0 and the provided max value (exclusive of
 *  max value).
 * @param max - the maximum value to use in Math.random()
 * @returns A random number between 0 and the max value provided.
 */
const floorRND = (max) => {
  const rnd = Math.random();
  const rndValUsingMax = rnd * max;
  return Math.floor(rndValUsingMax);
};

const shuffleArray = (array) => {
  let currentIndex = array.length;
  let randomIndex = 0;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = floorRND(currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  // unnecessary to use since this modifies the array in place, and this will
  // modify the original array argument where this func is called from
  return array;
};

const shuffleObjectWithNumberKeys = (obj) => {
  let currentIndex = obj.keys.length;
  let randomIndex = 0;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = floorRND(currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [obj[currentIndex], obj[randomIndex]] = [
      obj[randomIndex],
      obj[currentIndex],
    ];
  }

  return obj;
};

/**
 * It calculates a random number to place the col containing an img
 * min value is 0 to keep from going off screen to the left
 * max value is 100 - imgSize since I'm using this value as a percentage
 * and imgSize should be in vw units
 * @param imgSize - the width of the div containing the image
 * @returns A random number
 */
const getRNDPos = (imgSize) => {
  // use max to make sure we don't choose a negative value
  const maxPositionFromLeftEdge = 100 - imgSize;
  return Math.max(0, floorRND(maxPositionFromLeftEdge));
};

const noLuckFallback = (
  claimedPosVizArr,
  claimedPosArr,
  unclaimedPosSet,
  claimedPosSet,
  noLuck,
  imgSize,
) => {
  const lastDitchIterations = 100;
  let rnd = getRNDPos(imgSize);

  // just try to avoid direct overlap
  for (let i = 0; i < lastDitchIterations; i++) {
    const isRNDAlreadyAClaimedPos = claimedPosArr[rnd];
    if (isRNDAlreadyAClaimedPos) {
      rnd = getRNDPos(imgSize);
    } else {
      break;
    }
  }
  // add to set to try to avoid overlapping
  claimedPosSet.add(rnd);
  // add to array to return
  claimedPosVizArr[rnd] = true;
  claimedPosArr.push(rnd);

  const numUnclaimedPos = unclaimedPosSet.size;
  if (unclaimedPosSet && numUnclaimedPos > 0) {
    unclaimedPosSet.delete(i);
  }
  noLuck++;

  return {
    noLuck,
    claimedPosSet,
    claimedPosVizArr,
    claimedPosArr,
    unclaimedPosSet,
  };
};

const getMinOverlapNeeded = (imgSize, maxNumPosWOOverlap, numOfDVs) => {
  // actually don't want to go through at an overlap then increase overlap
  // because we'll get more overlap on some that we might've been able to avoid
  // if we started out spacing out imgs with the min overlap required given how
  // many imgs we need to show
  // we can use the following formula
  // imgSize - floor(maxNumPosAvail / numDVs)
  //
  // if we have more imgs we need to show than the max num of imgs without
  // overlap should try starting at a rnd pos between 0 and imgSize - 1
  // That way, avoid leaving too much space for another img to fit in
  // so if img width is 5, start at a pos between 0 - 4
  // as long as we choose a rnd img to put at each successive spaced out pos
  // we'll have our randomization
  // otherwise, we can choose rnd nums and make sure there isn't another pos
  // claimed within imgSize of it
  //
  //
  // num of times we've gone through a full set of pos overlapping at an
  // overlap value
  // Example:
  // if we have an img size of 5, we want to have a max pos of
  // 100 - imgSize = 95, so it has room to display, <95>,96,97,98,99
  // which equates to 95 + 1 = 96 (remember 0 is a possible pos) positions to
  // work with
  // we can fit floor(96 / 5) = 19 imgs in the window since each img takes up 5
  // positions in our imgSize = 5 example
  // Which leaves us with 96 - 19 = 77 pos left to work with
  //
  // if we start with an overlap of 1, our "width" changes from 5 to 4
  // We can think of this in terms of how many positions we need to reserve for
  // space between the current img pos and the previous one
  //
  // We can just consider one side since the next img will have
  // the other side of the previous img covered,
  // i.e., if we reserve 3 pos to the left of img a, and the next img is img b,
  // then the 3 pos we reserve for the left of img b will also be the 3 pos we
  // need to reserve to the right of img a
  // xxxAxxxB
  // so if we've got an overlap of 0, an img width of 5, then we need to
  // reserve 5 - 1 - 0 = 4 positions
  // if we've got an overlap of 1, then
  // 5 - 1 - 1 = 3 pos
  // or we can think of, with an overlap of 1, each img taking up 4 pos instead
  // of 5
  // which means with an img overlap of 1, a max pos avail of 96, we can fit
  // 96 / 4 = 24 imgs
  // or
  // 96 / (5 - 1) = 24
  // maxNumPosAvail / (imgSize - overlap) = maxNumClaimedPos
  //
  // at overlap of 3, img width of 10
  // floor(96 / (10 - 3)) = floor(96 / 7) = 13 imgs
  //
  // to find the size of the current min overlap we can reverse that
  // the img width minus (the max num of pos divided by the max num of claimed pos possible at that overlap)
  // maxNumPosAvail / numClaimedPos = imgSize - overlap
  // want to take the floor of the division result
  // imgSize - floor(maxNumPosAvail / numClaimedPos)
  // or
  // ceil of the total formula's result
  // ceil(imgSize - (maxNumPosAvail / numClaimedPos))
  //
  // but this gives the max num of pos at that overlap with the claimed pos
  // spaced out perfectly evenly
  // since we start with a rnd num that might not be true
  // we could try with this min overlap until we can't find a pos that fits,
  // then move to overlap + 1
  // but is there a way to calc this value or calc the num of pos we can fill
  // with a certain overlap given a certain num of unclaimed pos remaining?
  //
  //
  // Reserving 4 pos to the right of a claimed pos will give us a width of 5,
  // so with an overlap of 1 we want to reserve only 4 - 1 = 3 positions next
  // to each img
  //
  // if any imgs are close enough to the edge where there aren't enough pos to
  // reserve,
  // e.g., the img a is at pos 1,
  // then there's only 1 pos, pos 0, to reserve
  // xA
  // 01
  // we can change that to say if we're reserving 3 pos to the left of each
  // img and an img is less than 3 pos out from the left edge of the window,
  // we just need to reserve all pos to the left of that img or img pos - 0,
  // e.g., img a at pos 1 we reserve 1 - 0 = 1 pos, if img a is at pos 2, then
  // we reserve 2 spots, 1, 0, or 2 - 0
  // it's the min of pos - 0 or the current overlap number

  const overlap = imgSize - Math.floor(maxNumPosWOOverlap / numOfDVs);

  return overlap;
};

const getLeftImgBufferEdge = (rndPos, imgSize, overlap) => {
  return Math.max(rndPos - (imgSize - 1) + overlap + 1, 0);
};

const getRightImgBufferEdge = (rndPos, imgSize, overlap) => {
  return Math.min(rndPos + (imgSize - 1) + overlap - 1, 99);
};

const addPosToHelperObjs = (pos, helperObjs) => {
  // add pos to list of claimed pos
  helperObjs.claimedPosSet.add(pos);
  // mark index which is equal to the pos in the visualization array
  helperObjs.claimedPosVizArr[pos] = true;
  // add pos to claimed positions array
  helperObjs.claimedPosArr.push(pos);

  return helperObjs;
};

const claimPosAndNearby = (
  currPos,
  imgSize,
  overlap,
  numPosAvail,
  unclaimedPosSet,
) => {
  const leftEdgeImgBufferWOverlap = getLeftImgBufferEdge(
    currPos,
    imgSize,
    overlap,
  );
  const rightEdgeImgBufferWOverlap = getRightImgBufferEdge(
    currPos,
    imgSize,
    overlap,
  );
  for (
    let i = leftEdgeImgBufferWOverlap;
    i <= rightEdgeImgBufferWOverlap;
    i++
  ) {
    numPosAvail = unclaimedPosSet.size;
    if (unclaimedPosSet && numPosAvail > 0) {
      unclaimedPosSet.delete(i);
    }
  }
  return numPosAvail;
};

const fillPosWithOverlap = (
  imgSize,
  claimedPosSet,
  claimedPosVizArr,
  claimedPosArr,
  maxNumPosWOOverlap,
  posOverlapping,
  overlap,
  numOfDVs,
) => {
  let numClaimedPos = 0;
  const maxNumPosAvail = 100 - imgSize + 1 + 1;

  // if we started at pos >= imgSize we'd be leaving enough room for another
  // img to fit in before it
  const maxPosForFirstImg = imgSize - overlap;
  const firstPos = floorRND(maxPosForFirstImg);
  ({ claimedPosSet, claimedPosVizArr, claimedPosArr } = addPosToHelperObjs(
    firstPos,
    {
      claimedPosSet,
      claimedPosVizArr,
      claimedPosArr,
    },
  ));

  let prevPos = firstPos;
  numClaimedPos++;

  // TODO: figure how much we can space out if we're below the next overlap number
  let rndMaxSpacingAddition =
    Math.floor(numOfDVs / maxNumPosWOOverlap) + (maxNumPosAvail % numOfDVs);
  const minSpacing = imgSize - overlap - 1;
  let rnd = 0;
  while (numClaimedPos < numOfDVs) {
    // if we've got greater than 1 extra space left to work with,
    // divide it by 2 so we don't use all the extra space up in the first couple
    // of positions
    if (rndMaxSpacingAddition > 0) {
      const rndNumForChance = floorRND(101);
      const rndChance = rndNumForChance % 2;
      const rndChanceOfAddingXtraSpacing = rndChance === 0;
      if (rndChanceOfAddingXtraSpacing && rndMaxSpacingAddition > 1) {
        const halfMaxAmtExtraSpacing = Math.floor(rndMaxSpacingAddition / 2);
        rnd = floorRND(halfMaxAmtExtraSpacing) + 1;
      } else {
        rnd = floorRND(rndMaxSpacingAddition + 1);
      }
    } else {
      rnd = 0;
    }
    // calc the pos
    const currPos = prevPos + minSpacing + 1 + rnd;
    rndMaxSpacingAddition -= rnd;
    const extraSpacingUsed = currPos - (prevPos + imgSize - overlap);

    ({ claimedPosSet, claimedPosVizArr, claimedPosArr } = addPosToHelperObjs(
      currPos,
      {
        claimedPosSet,
        claimedPosVizArr,
        claimedPosArr,
      },
    ));

    posOverlapping.withoutOverlap = posOverlapping.withoutOverlap + 1;

    numClaimedPos++;
    prevPos = currPos;
  }

  return {
    claimedPosSet,
    claimedPosVizArr,
    claimedPosArr,
    posOverlapping,
  };
};

/**
 * Generates random position and adds to and returns an array
 * @returns An array of random positions without overlap
 */
const fillPosWOOverlap = (
  claimedPosSet,
  claimedPosVizArr,
  claimedPosArr,
  unclaimedPosSet,
  imgSize,
  noLuck,
  numOfDVs,
  totNumPosAvail,
) => {
  const overlap = 0;
  const numOfPosTakenImg = imgSize - 1;
  const numOfPosNeededForAllImgs = numOfPosTakenImg * numOfDVs;
  let xtraSpacing = totNumPosAvail - numOfPosNeededForAllImgs;
  let rnd = xtraSpacing;
  let currPos = floorRND(imgSize + xtraSpacing);
  let prevPos = 0;
  let numPosAvail = unclaimedPosSet.size;

  // Remove first pos and imgSize - 1 positions after it to avoid overlap
  for (let i = 0; i < currPos + imgSize - 1; i++) {
    unclaimedPosSet.delete(i);
  }

  let j = 0;
  while (claimedPosArr.length < numOfDVs) {
    prevPos = currPos;
    xtraSpacing -= rnd;
    ({ claimedPosSet, claimedPosVizArr, claimedPosArr } = addPosToHelperObjs(
      currPos,
      {
        claimedPosSet,
        claimedPosVizArr,
        claimedPosArr,
      },
    ));

    // should only hit this first conditional block if numOfDVs <
    // maxNumPosWOOverlapping
    if (numPosAvail > 0) {
      // get a rnd num to add to prev pos
      rnd = floorRND(xtraSpacing + 1);
      currPos = prevPos + imgSize + rnd;

      // walk positions from leftmost position that would be overlapping too much
      // to the rightmost position that would be overlapping too much
      numPosAvail = claimPosAndNearby(
        currPos,
        imgSize,
        overlap,
        numPosAvail,
        unclaimedPosSet,
      );
    }
  }

  return {
    claimedPosSet,
    claimedPosVizArr,
    claimedPosArr,
    unclaimedPosSet,
    noLuck,
  };
};

// fill an array while trying to avoid overlap and moving up slowly
// on how much overlap we add
const generateDVColPosArrays = (numOfDVs, imgSize) => {
  // if imgSize were 1, we'd have 100 position slots from 0 - 99
  // if imgSize were 5, we'd have 96 positions to work with 0 - 95
  const maxPosToAvoidClipping = 100 - imgSize;
  const totNumPosAvail = maxPosToAvoidClipping + 1;
  const maxNumPosWOOverlap = Math.floor(totNumPosAvail / imgSize);
  const posOverlapping = {
    withoutOverlap: 0,
    withPartialOverlap: 0,
    withOverlap: 0,
    withRandom: 0,
  };
  let numPosClaimed = 0;
  let noLuck = 0;
  let claimedPosSet = new Set();
  let claimedPosVizArr = new Array(100);
  let claimedPosArr = new Array();
  let unclaimedPosSet = new Set();
  claimedPosVizArr = claimedPosVizArr.fill(0);

  for (let i = 0; i <= 100 - imgSize; i++) {
    unclaimedPosSet.add(i);
  }

  if (numOfDVs > maxNumPosWOOverlap) {
    // with overlap
    const overlap = getMinOverlapNeeded(imgSize, totNumPosAvail, numOfDVs);

    ({} = fillPosWithOverlap(
      imgSize,
      claimedPosSet,
      claimedPosVizArr,
      claimedPosArr,
      maxNumPosWOOverlap,
      posOverlapping,
      overlap,
      numOfDVs,
    ));
  } else {
    // without overlap

    ({
      claimedPosSet,
      claimedPosVizArr,
      claimedPosArr,
      unclaimedPosSet,
      noLuck,
      numPosClaimed,
    } = fillPosWOOverlap(
      claimedPosSet,
      claimedPosVizArr,
      claimedPosArr,
      unclaimedPosSet,
      imgSize,
      noLuck,
      numOfDVs,
      totNumPosAvail,
    ));
  }

  return {
    claimedPosVizArr,
    claimedPosArr,
    noLuck,
    posOverlapping,
    maxNumPosWOOverlap,
  };
};

/**
 * It generates a random string of characters that can be used as a code
 * @param numOfCodes - The number of codes you want to generate.
 * @returns An array of codes.
 */
const generateCodes = (numOfCodes) => {
  const codes = [];
  for (let i = 0; i < numOfCodes; i++) {
    const code = crypto.randomBytes(64).toString("base64url");
    codes.push(code);
  }

  return codes;
};

const getImgToUseAtPos = (
  chanceForOh,
  ohs,
  ones,
  twos,
  image,
  position,
  initPos,
  rnd,
  immediateRight,
  immediateLeft,
) => {
  const rndChanceToUseOhImg = floorRND(chanceForOh);

  if (
    position !== immediateRight &&
    position !== immediateLeft &&
    rndChanceToUseOhImg === 0
  ) {
    const rndOhIndex = floorRND(ohs.length);
    image = ohs[rndOhIndex];
  } else if (position < initPos) {
    // rnd will be < 0 if ones and twos arrays are of different lengths
    if (rnd < 0) {
      rnd = floorRND(ones.length);
    }
    image = ones[rnd];
  } else {
    // rnd will be < 0 if ones and twos arrays are of different lengths
    if (rnd < 0) {
      rnd = floorRND(twos.length);
    }
    image = twos[rnd];
  }

  return image;
};

const getImgToUseAtPosHorizontal = (
  chanceForOh,
  ohs,
  ohhs,
  ones,
  oness,
  twos,
  twoss,
  image,
  image2,
  position,
  initPos,
  rnd,
  immediateRight,
  immediateLeft,
) => {
  const rndChanceToUseOhImg = floorRND(chanceForOh);

  if (
    position !== immediateRight &&
    position !== immediateLeft &&
    rndChanceToUseOhImg === 0
  ) {
    const rndOhIndex = floorRND(ohs.length);
    image = ohs[rndOhIndex];
    image2 = ohhs[rndOhIndex];
  } else if (position < initPos) {
    // rnd will be < 0 if ones and twos arrays are of different lengths
    if (rnd < 0) {
      rnd = floorRND(ones.length);
    }
    image = ones[rnd];
    image2 = oness[rnd];
  } else {
    // rnd will be < 0 if ones and twos arrays are of different lengths
    if (rnd < 0) {
      rnd = floorRND(twos.length);
    }
    image = twos[rnd];
    image2 = twoss[rnd];
  }

  return { image, image2 };
};

const fillRenderings = (
  numOfDVs,
  initRND,
  chanceForOh,
  ohs,
  ones,
  twos,
  codes,
  claimedPosArr,
  claimedPosVizArr,
  initPos,
  renderings,
) => {
  let rnd = -1;
  let code = 0;
  let position = 0;
  let image = "";
  let immediateRight = initPos + 1;
  let immediateLeft = initPos - 1;

  for (let i = initPos + 1; i < claimedPosVizArr.length; i++) {
    if (claimedPosVizArr[i]) {
      immediateRight = i;
      break;
    }
  }

  for (let i = initPos - 1; i >= 0; i--) {
    if (claimedPosVizArr[i]) {
      immediateLeft = i;
      break;
    }
  }

  for (let i = 0; i < numOfDVs; i++) {
    // skip the "chosen one" index (the one we used for initializing renderings)
    if (i === initRND) {
      continue;
    }

    if (ones.length === twos.length) {
      rnd = floorRND(ones.length);
    }

    code = codes[i];
    position = claimedPosArr[i];

    image = getImgToUseAtPos(
      chanceForOh,
      ohs,
      ones,
      twos,
      image,
      position,
      initPos,
      rnd,
      immediateRight,
      immediateLeft,
    );

    renderings[i] = { value: code, pos: position, img: image };
  }

  return renderings;
};

const fillRenderings2D = (
  numOfDVs,
  initRND,
  chanceForOh,
  ohs,
  ohhs,
  ones,
  oness,
  twos,
  twoss,
  codes,
  claimedPosArr,
  claimedPosVizArr,
  initPos,
  renderings,
) => {
  let rnd = -1;
  let code = 0;
  let position = 0;
  let image = "";
  let image2 = "";
  let immediateRight = initPos + 1;
  let immediateLeft = initPos - 1;

  for (let i = initPos + 1; i < claimedPosVizArr.length; i++) {
    if (claimedPosVizArr[i]) {
      immediateRight = i;
      break;
    }
  }

  for (let i = initPos - 1; i >= 0; i--) {
    if (claimedPosVizArr[i]) {
      immediateLeft = i;
      break;
    }
  }

  for (let i = 0; i < numOfDVs; i++) {
    // skip the "chosen one" index (the one we used for initializing renderings)
    if (i === initRND) {
      continue;
    }

    if (ones.length === twos.length) {
      rnd = floorRND(ones.length);
    }

    code = codes[i];
    position = claimedPosArr[i];

    ({ image, image2 } = getImgToUseAtPosHorizontal(
      chanceForOh,
      ohs,
      ohhs,
      ones,
      oness,
      twos,
      twoss,
      image,
      image2,
      position,
      initPos,
      rnd,
      immediateRight,
      immediateLeft,
    ));

    renderings[i] = { value: code, pos: position, img: [image, image2] };
  }

  return renderings;
};

const getImgOptions = (theme) => {
  const mes = images.me;
  const mees = images.mee;
  const meees = images.meee;
  const meeees = images.meeee;
  const pings = images.ping;
  const as = images.pointA;
  const bs = images.pointB;
  const cs = images.pointC;
  const ds = images.pointD;
  const fs = images.pointF;
  const ffs = images.pointFF;
  const gs = images.pointG;
  const ggs = images.pointGG;
  const is = images.pointI;
  const js = images.pointJ;
  const bw = images.pointBW;
  const bw_r = images.pointBW_R;
  const bw_l = images.pointBW_L;

  // shuffle
  let ohs;
  let ones;
  let twos;
  if (theme === "seeingDouble") {
    ohs = shuffleArray(mes);
    ones = shuffleArray(as);
    twos = shuffleArray(bs);
  } else if (theme === "ahhhhhh") {
    ohs = shuffleArray(mees);
    ones = shuffleArray(cs);
    twos = shuffleArray(ds);
  } else if (theme === "bitwarden") {
    ohs = shuffleArray(bw);
    ones = shuffleArray(bw_l);
    twos = shuffleArray(bw_r);
  } else if (theme === "racing") {
    ohs = shuffleArray(meees);
    ohhs = shuffleArray(meeees);
    ones = shuffleArray(fs);
    oness = shuffleArray(ffs);
    twos = shuffleArray(gs);
    twoss = shuffleArray(ggs);

    return {
      ohs,
      ohhs,
      ones,
      oness,
      twos,
      twoss,
    };
  } else {
    ohs = shuffleArray(mes);
    ones = shuffleArray(as);
    twos = shuffleArray(bs);
  }

  return { ohs, ones, twos };
};

const combineCodesAndPosArrayAndImgs = (
  numOfDVs,
  codes,
  claimedPosArr,
  claimedPosVizArr,
  theme,
) => {
  // init
  let renderings = {};
  const initRND = floorRND(numOfDVs);
  const initCode = codes[initRND];
  const initPos = claimedPosArr[initRND];

  // inverse of percentage chance (percentage chance will be equal to 1 over
  // this number) for having another "oh" image show up
  let chanceForOh = 10;

  // img options
  const imgOptions = getImgOptions(theme);

  if (Object.values(imgOptions).length > 3) {
    const { ohs, ohhs, ones, oness, twos, twoss } = imgOptions;

    const rndOh = floorRND(ohs.length);
    const initImage = ohs[rndOh];
    const initImage2 = ohhs[rndOh];

    // initial rendering
    renderings[initRND] = {
      value: initCode,
      pos: initPos,
      img: [initImage, initImage2],
    };

    renderings = fillRenderings2D(
      numOfDVs,
      initRND,
      chanceForOh,
      ohs,
      ohhs,
      ones,
      oness,
      twos,
      twoss,
      codes,
      claimedPosArr,
      claimedPosVizArr,
      initPos,
      renderings,
    );
  } else {
    const { ohs, ones, twos } = imgOptions;

    const rndOh = floorRND(ohs.length);
    const initImage = ohs[rndOh];

    // initial rendering
    renderings[initRND] = { value: initCode, pos: initPos, img: initImage };

    renderings = fillRenderings(
      numOfDVs,
      initRND,
      chanceForOh,
      ohs,
      ones,
      twos,
      codes,
      claimedPosArr,
      claimedPosVizArr,
      initPos,
      renderings,
    );
  }

  const renderingsString = JSON.stringify(renderings);

  return { code: initCode, renderings: renderingsString };
};

module.exports = a = async ({ params }) => {
  const numOfDVs = Number(params.numDVs);
  const imgSize = Number(params.imgSize);
  const imgSizeRacing = Number(params.imgSizeRacing);
  const theme = params.theme;
  const bgImgSrc = images.bg[theme];
  let size;
  if (theme === "racing") {
    size = imgSizeRacing;
  } else {
    size = imgSize;
  }
  let {
    claimedPosVizArr,
    claimedPosArr,
    noLuck,
    posOverlapping,
    maxNumPosWOOverlap,
  } = generateDVColPosArrays(numOfDVs, size);

  const codes = generateCodes(numOfDVs);

  const { code, renderings } = combineCodesAndPosArrayAndImgs(
    numOfDVs,
    codes,
    claimedPosArr,
    claimedPosVizArr,
    theme,
  );
  const numDirectOverlaps =
    claimedPosArr.length - claimedPosVizArr.filter((pos) => pos).length;

  const positionsSorted = claimedPosArr.sort((a, b) => {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  });

  const output = {
    themeSrc: bgImgSrc,
    code: code,
    renderings: renderings,
    posArray: claimedPosVizArr,
    positions: claimedPosArr,
    positionsSorted: positionsSorted,
    posArrayLength: claimedPosArr.length,
    noLuck: noLuck,
    posOverlapping: posOverlapping,
    maxNumPosWOOverlap: maxNumPosWOOverlap,
    numDirectOverlaps: numDirectOverlaps,
  };

  return output;
};
