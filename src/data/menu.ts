import type { Restaurant } from '../types';

export const restaurantNames = [
  'Dost Tost',
  'Hart Dog',
  'Wonder Waffle',
  'Pilavneli',
  'Çiko Çiğköfte',
  'Tavuk Sepeti',
  '322 Döner',
  'Annemin Elinden Ev Yemekleri',
  'Sandwich Lab',
  'Fit Wraps',
  'Smaaash Burger',
  'SucuKöfte',
  'Misu Tiramisu'
];

export const restaurantMenus: Restaurant[] = [
  {
    id: '1',
    name: 'Dost Tost',
    logoUrl: 'logos/dost-tost.jpg',
    categories: [
      {
        name: 'Tostlar',
        items: [
          {
            id: 'dt-t-1',
            name: 'Dost Tost',
            description: '50 gr. kaşar peyniri, 30 gr. dana kavurma, 30 gr. kasap sucuk',
            price: 150,
            imageUrl: 'images/dost-tost.jpg',
            category: 'Tostlar',
            optionCategories: [
              {
                name: 'Ekmek Seçimi',
                options: [
                  { name: 'Bazlama', priceAdjustment: 5 },
                  { name: 'Ayvalık', priceAdjustment: 0 },
                  { name: 'Sandviç', priceAdjustment: 0 },
                ],
                choiceType: 'single',
                isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Soslu', priceAdjustment: 0 },
                  { name: 'Sossuz', priceAdjustment: 0 },
                ],
                choiceType: 'single',
                isMandatory: true,
              },
              {
                name: 'Ekstra Malzeme Seçimi',
                options: [
                  { name: 'Ekstra Kasap Sucuk', priceAdjustment: 20 },
                  { name: 'Ekstra Kavurma', priceAdjustment: 30 },
                  { name: 'Ekstra Kaşar', priceAdjustment: 10 },
                ],
                choiceType: 'multi',
                isMandatory: false,
              },
            ],
          },
          {
            id: 'dt-t-2',
            name: 'Düşman Tost',
            description: 'Acı soslu 50 gr. kaşar peyniri, 30 gr. dana kavurma, 30 gr. kasap sucuk',
            price: 150,
            imageUrl: 'images/dusman-tost.jpg',
            category: 'Tostlar',
            optionCategories: [
              {
                name: 'Ekmek Seçimi',
                options: [
                  { name: 'Bazlama', priceAdjustment: 5 },
                  { name: 'Ayvalık', priceAdjustment: 0 },
                  { name: 'Sandviç', priceAdjustment: 0 },
                ],
                choiceType: 'single',
                isMandatory: true,
              },
              {
                name: 'Ekstra Malzeme Seçimi',
                options: [
                  { name: 'Ekstra Kasap Sucuk', priceAdjustment: 20 },
                  { name: 'Ekstra Kavurma', priceAdjustment: 30 },
                  { name: 'Ekstra Kaşar', priceAdjustment: 10 },
                ],
                choiceType: 'multi',
                isMandatory: false,
              },
            ],
          },
          {
            id: 'dt-t-3',
            name: 'Tower Tost',
            description: '3 kat ekmek, 2 kat malzeme',
            price: 150,
            imageUrl: 'images/tower-tost.jpg',
            category: 'Tostlar',
            optionCategories: [
              {
                name: '1. Kat Peynir Seçimi',
                options: [
                  { name: 'Labne', priceAdjustment: 0 },
                  { name: 'Kaşar', priceAdjustment: 0 },
                  { name: 'Cheddar', priceAdjustment: 10 },
                ],
                choiceType: 'single',
                isMandatory: true,
              },
              {
                name: '1. Kat Şarküteri Seçimi',
                options: [
                  { name: 'İstemiyorum', priceAdjustment: 0 },
                  { name: 'Sucuk', priceAdjustment: 5 },
                  { name: 'Kasap Sucuk', priceAdjustment: 10 },
                  {name: 'Kavurma', priceAdjustment: 20},
                  {name: 'Dana Salam', priceAdjustment: 15},
                  {name: 'Dana Jambon', priceAdjustment: 15},
                  {name: 'Dana Bacon', priceAdjustment: 20},
                  {name: 'Roastbeef', priceAdjustment: 25},
                ],
                choiceType: 'single',
                isMandatory: true,
              },
              {
                name: '2. Kat Peynir Seçimi',
                options: [
                  { name: 'Labne', priceAdjustment: 0 },
                  { name: 'Kaşar', priceAdjustment: 0 },
                  { name: 'Cheddar', priceAdjustment: 10 },
                ],
                choiceType: 'single',
                isMandatory: true,
              },
              {
                name: '2. Kat Şarküteri Seçimi',
                options: [
                  { name: 'İstemiyorum', priceAdjustment: 0 },
                  { name: 'Sucuk', priceAdjustment: 5 },
                  { name: 'Kasap Sucuk', priceAdjustment: 10 },
                  {name: 'Kavurma', priceAdjustment: 20},
                  {name: 'Dana Salam', priceAdjustment: 15},
                  {name: 'Dana Jambon', priceAdjustment: 15},
                  {name: 'Dana Bacon', priceAdjustment: 20},
                  {name: 'Roastbeef', priceAdjustment: 25},
                ],
                choiceType: 'single',
                isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Soslu', priceAdjustment: 0 },
                  { name: 'Acılı', priceAdjustment: 0 },
                  { name: 'Sossuz', priceAdjustment: 0 },
                ],
                choiceType: 'single',
                isMandatory: true,
              },
            ],
          },
          {
            id: 'dt-t-4',
            name: 'Kaşarlı Tost',
            description: 'Seçeceğiniz Ekmekte (Bazlama - Ayvalık - Sandviç ) 50 gr. kaşar peyniri',
            price: 60,
            imageUrl: 'images/kasarli-tost.jpg',
            category: 'Tostlar',
            optionCategories: [
              {
                name: 'Ekmek Seçimi',
                options: [
                  { name: 'Bazlama', priceAdjustment: 5 },
                  { name: 'Ayvalık', priceAdjustment: 0 },
                  { name: 'Sandviç', priceAdjustment: 0 },
                ],
                choiceType: 'single',
                isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Soslu', priceAdjustment: 0 },
                  { name: 'Sossuz', priceAdjustment: 0 },
                  {name: 'Acılı', priceAdjustment:0},
                ],
                choiceType: 'single',
                isMandatory: true,
              },
              {
                name: 'Ekstra Malzeme Seçimi',
                options: [
                  { name: 'Ekstra Kaşar', priceAdjustment: 10 },
                ],
                choiceType: 'multi',
                isMandatory: false,
              },
            ],
          },
          {
            id: 'dt-t-5',
            name: 'Kaşarlı Sucuklu Tost',
            description: 'Seçeceğiniz Ekmekte (Bazlama - Ayvalık - Sandviç ) 50 gr. kaşar peyniri, 40 gr. Sucuk',
            price: 80,
            imageUrl: 'images/kasarli-sucuklu-tost.jpg',
            category: 'Tostlar',
            optionCategories: [
              {
                name: 'Ekmek Seçimi',
                options: [
                  { name: 'Bazlama', priceAdjustment: 5 },
                  { name: 'Ayvalık', priceAdjustment: 0 },
                  { name: 'Sandviç', priceAdjustment: 0 },
                ],
                choiceType: 'single',
                isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Soslu', priceAdjustment: 0 },
                  { name: 'Sossuz', priceAdjustment: 0 },
                  {name: 'Acılı', priceAdjustment:0},
                ],
                choiceType: 'single',
                isMandatory: true,
              },
              {
                name: 'Ekstra Malzeme Seçimi',
                options: [
                  { name: 'Ekstra Kaşar', priceAdjustment: 10 },
                  {name: 'Ekstra Sucuk', priceAdjustment:10},
                ],
                choiceType: 'multi',
                isMandatory: false,
              },
            ],
          },
          {
            id: 'dt-t-6',
            name: 'Kasap Sucuklu Kaşarlı Tost',
            description: 'Seçeceğiniz Ekmekte (Bazlama - Ayvalık - Sandviç ) 50 gr. kaşar peyniri, 40 gr. Kasap Sucuk',
            price: 100,
            imageUrl: 'images/kasap-sucuklu.jpg',
            category: 'Tostlar',
            optionCategories: [
              {
                name: 'Ekmek Seçimi',
                options: [
                  { name: 'Bazlama', priceAdjustment: 5 },
                  { name: 'Ayvalık', priceAdjustment: 0 },
                  { name: 'Sandviç', priceAdjustment: 0 },
                ],
                choiceType: 'single',
                isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Soslu', priceAdjustment: 0 },
                  { name: 'Sossuz', priceAdjustment: 0 },
                  {name: 'Acılı', priceAdjustment:0},
                ],
                choiceType: 'single',
                isMandatory: true,
              },
              {
                name: 'Ekstra Malzeme Seçimi',
                options: [
                  { name: 'Ekstra Kaşar', priceAdjustment: 10 },
                  { name: 'Ekstra Kasap Sucuk', priceAdjustment: 20 },
                ],
                choiceType: 'multi',
                isMandatory: false,
              },
            ],
          },
          {
            id: 'dt-t-7',
            name: 'Kavurmalı Kaşarlı Tost',
            description: 'Seçeceğiniz Ekmekte (Bazlama - Ayvalık - Sandviç ) 50 gr. kaşar peyniri, 40 gr. Dana Kavurma',
            price: 125,
            imageUrl: 'images/kavurma-kasar.jpg',
            category: 'Tostlar',
            optionCategories: [
              {
                name: 'Ekmek Seçimi',
                options: [
                  { name: 'Bazlama', priceAdjustment: 5 },
                  { name: 'Ayvalık', priceAdjustment: 0 },
                  { name: 'Sandviç', priceAdjustment: 0 },
                ],
                choiceType: 'single',
                isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Soslu', priceAdjustment: 0 },
                  { name: 'Sossuz', priceAdjustment: 0 },
                  {name: 'Acılı', priceAdjustment:0},
                ],
                choiceType: 'single',
                isMandatory: true,
              },
              {
                name: 'Ekstra Malzeme Seçimi',
                options: [
                  { name: 'Ekstra Kaşar', priceAdjustment: 10 },
                  { name: 'Ekstra Kavurma', priceAdjustment: 25 },
                ],
                choiceType: 'multi',
                isMandatory: false,
              },
            ],
          },
          {
            id: 'dt-t-8',
            name: 'Cheddarlı Kaşarlı Tost',
            description: 'Seçeceğiniz Ekmekte (Bazlama - Ayvalık - Sandviç ) 50 gr. kaşar peyniri, 30 gr. Cheddar',
            price: 100,
            imageUrl: 'images/cheddar-kasar.jpg',
            category: 'Tostlar',
            optionCategories: [
              {
                name: 'Ekmek Seçimi',
                options: [
                  { name: 'Bazlama', priceAdjustment: 5 },
                  { name: 'Ayvalık', priceAdjustment: 0 },
                  { name: 'Sandviç', priceAdjustment: 0 },
                ],
                choiceType: 'single',
                isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  {name: 'Acılı', priceAdjustment:0},
                ],
                choiceType: 'single',
                isMandatory: true,
              },
              {
                name: 'Ekstra Malzeme Seçimi',
                options: [
                  { name: 'Ekstra Kaşar', priceAdjustment: 10 },
                  { name: 'Ekstra Cheddar', priceAdjustment: 20 },
                ],
                choiceType: 'multi',
                isMandatory: false,
              },
            ],
          },
          {
            id: 'dt-t-9',
            name: '3 Peynirli Tost',
            description: 'Seçeceğiniz Ekmekte (Bazlama - Ayvalık - Sandviç ) 50 gr. kaşar peyniri, 30 gr. Cheddar, Labne',
            price: 120,
            imageUrl: 'images/cheddar-kasar.jpg',
            category: 'Tostlar',
            optionCategories: [
              {
                name: 'Ekmek Seçimi',
                options: [
                  { name: 'Bazlama', priceAdjustment: 5 },
                  { name: 'Ayvalık', priceAdjustment: 0 },
                  { name: 'Sandviç', priceAdjustment: 0 },
                ],
                choiceType: 'single',
                isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  {name: 'Acılı', priceAdjustment:0},
                ],
                choiceType: 'single',
                isMandatory: true,
              },
              {
                name: 'Ekstra Malzeme Seçimi',
                options: [
                  { name: 'Ekstra Kaşar', priceAdjustment: 10 },
                  { name: 'Ekstra Cheddar', priceAdjustment: 20 },
                  {name: 'Ekstra Labne', priceAdjustment:10},
                ],
                choiceType: 'multi',
                isMandatory: false,
              },
            ],
          },
          {
            id: 'dt-t-10',
            name: 'Dana Salamlı Kaşarlı Tost',
            description: 'Seçeceğiniz Ekmekte (Bazlama - Ayvalık - Sandviç ) 50 gr. kaşar peyniri, 40 gr. Dana Salam',
            price: 150,
            imageUrl: 'images/generic-tost.jpg',
            category: 'Tostlar',
            optionCategories: [
              {
                name: 'Ekmek Seçimi',
                options: [
                  { name: 'Bazlama', priceAdjustment: 5 },
                  { name: 'Ayvalık', priceAdjustment: 0 },
                  { name: 'Sandviç', priceAdjustment: 0 },
                ],
                choiceType: 'single',
                isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Soslu', priceAdjustment: 0 },
                  { name: 'Sossuz', priceAdjustment: 0 },
                  {name: 'Acılı', priceAdjustment:0},
                ],
                choiceType: 'single',
                isMandatory: true,
              },
              {
                name: 'Ekstra Malzeme Seçimi',
                options: [
                  { name: 'Ekstra Kaşar', priceAdjustment: 10 },
                  { name: 'Ekstra Dana Salam', priceAdjustment: 20 },
                ],
                choiceType: 'multi',
                isMandatory: false,
              },
            ],
          },
          {
            id: 'dt-t-11',
            name: 'Dana Jambonlu Kaşarlı Tost',
            description: 'Seçeceğiniz Ekmekte (Bazlama - Ayvalık - Sandviç ) 50 gr. kaşar peyniri, 40 gr. Dana Jambon',
            price: 150,
            imageUrl: 'images/generic-tost.jpg',
            category: 'Tostlar',
            optionCategories: [
              {
                name: 'Ekmek Seçimi',
                options: [
                  { name: 'Bazlama', priceAdjustment: 5 },
                  { name: 'Ayvalık', priceAdjustment: 0 },
                  { name: 'Sandviç', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Soslu', priceAdjustment: 0 },
                  { name: 'Sossuz', priceAdjustment: 0 },
                  {name: 'Acılı', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Ekstra Malzeme Seçimi',
                options: [
                  { name: 'Ekstra Kaşar', priceAdjustment: 10 },
                  { name: 'Ekstra Dana Jambon', priceAdjustment: 20 },
                ],
                choiceType: 'multi',isMandatory: false,
              },
            ],
          },
          {
            id: 'dt-t-12',
            name: 'Dana Baconlu Tost',
            description: 'Seçeceğiniz Ekmekte (Bazlama - Ayvalık - Sandviç ) 50 gr. kaşar peyniri, 40 gr. Dana Bacon',
            price: 175,
            imageUrl: 'images/generic-tost.jpg',
            category: 'Tostlar',
            optionCategories: [
              {
                name: 'Ekmek Seçimi',
                options: [
                  { name: 'Bazlama', priceAdjustment: 5 },
                  { name: 'Ayvalık', priceAdjustment: 0 },
                  { name: 'Sandviç', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Soslu', priceAdjustment: 0 },
                  { name: 'Sossuz', priceAdjustment: 0 },
                  {name: 'Acılı', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Ekstra Malzeme Seçimi',
                options: [
                  { name: 'Ekstra Kaşar', priceAdjustment: 10 },
                  { name: 'Ekstra Dana Bacon', priceAdjustment: 25 },
                ],
                choiceType: 'multi',isMandatory: false,
              },
            ],
          },
          {
            id: 'dt-t-13',
            name: 'Füme Roastbeefli Kaşarlı Tost',
            description: 'Seçeceğiniz Ekmekte (Bazlama - Ayvalık - Sandviç ) 50 gr. kaşar peyniri, 40 gr. Füme Roastbeef',
            price: 175,
            imageUrl: 'images/generic-tost.jpg',
            category: 'Tostlar',
            optionCategories: [
              {
                name: 'Ekmek Seçimi',
                options: [
                  { name: 'Bazlama', priceAdjustment: 5 },
                  { name: 'Ayvalık', priceAdjustment: 0 },
                  { name: 'Sandviç', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Soslu', priceAdjustment: 0 },
                  { name: 'Sossuz', priceAdjustment: 0 },
                  {name: 'Acılı', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Ekstra Malzeme Seçimi',
                options: [
                  { name: 'Ekstra Kaşar', priceAdjustment: 10 },
                  { name: 'Ekstra Roastbeef', priceAdjustment: 30 },
                ],
                choiceType: 'multi',isMandatory: false,
              },
            ],
          }
          
        ]
      },
      {
        name: 'Menüler',
        items: [
          {
            id: 'dt-m-1',
            name: 'Dost Tost Menü',
            description: 'Dost Tost + Patates Kızartması + Dilediğiniz İçecek + Söğüş + İkram Tatlı',
            price: 210,
            imageUrl: 'images/dost-tost.jpg',
            category: 'Menüler',
            optionCategories: [
              {
                name: 'Ekmek Seçimi',
                options: [
                  { name: 'Bazlama', priceAdjustment: 5 },
                  { name: 'Ayvalık', priceAdjustment: 0 },
                  { name: 'Sandviç', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Soslu', priceAdjustment: 0 },
                  { name: 'Sossuz', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Ekstra Malzeme Seçimi',
                options: [
                  { name: 'Ekstra Kasap Sucuk', priceAdjustment: 20 },
                  { name: 'Ekstra Kavurma', priceAdjustment: 30 },
                  { name: 'Ekstra Kaşar', priceAdjustment: 10 },
                ],
                choiceType: 'multi',isMandatory: false,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'İçecek Seçimi',
                options:[
                  {name: 'Ayran', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acılı', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acısız', priceAdjustment:0},
                  {name: 'Pepsi', priceAdjustment: 10},
                  {name: 'Pepsi-Zero', priceAdjustment:10},
                  {name: 'Yedigün', priceAdjustment:10},
                  {name: '7Up', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Şeftali', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Limon', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Mango', priceAdjustment:10},
                  {name: 'Tropicana Karışık', priceAdjustment:10},
                  {name: 'Tropicana Vişne', priceAdjustment:10},
                  {name: 'Tropicana Şeftali', priceAdjustment:10},
                  {name: 'Taze Sıkılmış Portakal Suyu', priceAdjustment:40},
                ],
                choiceType:'single', isMandatory:true,
              }
            ],
          },
          {
            id: 'dt-m-2',
            name: 'Düşman Tost Menü',
            description: 'Düşman Tost + Patates Kızartması + Dilediğiniz İçecek + Söğüş + İkram Tatlı',
            price: 210,
            imageUrl: 'images/dusman-tost.jpg',
            category: 'Menüler',
            optionCategories: [
              {
                name: 'Ekmek Seçimi',
                options: [
                  { name: 'Bazlama', priceAdjustment: 5 },
                  { name: 'Ayvalık', priceAdjustment: 0 },
                  { name: 'Sandviç', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Ekstra Malzeme Seçimi',
                options: [
                  { name: 'Ekstra Kasap Sucuk', priceAdjustment: 20 },
                  { name: 'Ekstra Kavurma', priceAdjustment: 30 },
                  { name: 'Ekstra Kaşar', priceAdjustment: 10 },
                ],
                choiceType: 'multi',isMandatory: false,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'İçecek Seçimi',
                options:[
                  {name: 'Ayran', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acılı', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acısız', priceAdjustment:0},
                  {name: 'Pepsi', priceAdjustment: 10},
                  {name: 'Pepsi-Zero', priceAdjustment:10},
                  {name: 'Yedigün', priceAdjustment:10},
                  {name: '7Up', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Şeftali', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Limon', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Mango', priceAdjustment:10},
                  {name: 'Tropicana Karışık', priceAdjustment:10},
                  {name: 'Tropicana Vişne', priceAdjustment:10},
                  {name: 'Tropicana Şeftali', priceAdjustment:10},
                  {name: 'Taze Sıkılmış Portakal Suyu', priceAdjustment:40},
                ],
                choiceType:'single', isMandatory:true,
              }
            ],
          },
          {
            id: 'dt-m-3',
            name: 'Tower Tost Menü',
            description: 'Tower Tost + Patates Kızartması + Dilediğiniz İçecek + Söğüş + İkram Tatlı',
            price: 210,
            imageUrl: 'images/tower-tost.jpg',
            category: 'Menüler',
            optionCategories: [
              {
                name: '1. Kat Peynir Seçimi',
                options: [
                  { name: 'Labne', priceAdjustment: 0 },
                  { name: 'Kaşar', priceAdjustment: 0 },
                  { name: 'Cheddar', priceAdjustment: 10 },
                ],
                choiceType: 'single',
                isMandatory: true,
              },
              {
                name: '1. Kat Şarküteri Seçimi',
                options: [
                  { name: 'İstemiyorum', priceAdjustment: 0 },
                  { name: 'Sucuk', priceAdjustment: 5 },
                  { name: 'Kasap Sucuk', priceAdjustment: 10 },
                  {name: 'Kavurma', priceAdjustment: 20},
                  {name: 'Dana Salam', priceAdjustment: 15},
                  {name: 'Dana Jambon', priceAdjustment: 15},
                  {name: 'Dana Bacon', priceAdjustment: 20},
                  {name: 'Roastbeef', priceAdjustment: 25},
                ],
                choiceType: 'single',
                isMandatory: true,
              },
              {
                name: '2. Kat Peynir Seçimi',
                options: [
                  { name: 'Labne', priceAdjustment: 0 },
                  { name: 'Kaşar', priceAdjustment: 0 },
                  { name: 'Cheddar', priceAdjustment: 10 },
                ],
                choiceType: 'single',
                isMandatory: true,
              },
              {
                name: '2. Kat Şarküteri Seçimi',
                options: [
                  { name: 'İstemiyorum', priceAdjustment: 0 },
                  { name: 'Sucuk', priceAdjustment: 5 },
                  { name: 'Kasap Sucuk', priceAdjustment: 10 },
                  {name: 'Kavurma', priceAdjustment: 20},
                  {name: 'Dana Salam', priceAdjustment: 15},
                  {name: 'Dana Jambon', priceAdjustment: 15},
                  {name: 'Dana Bacon', priceAdjustment: 20},
                  {name: 'Roastbeef', priceAdjustment: 25},
                ],
                choiceType: 'single',
                isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Soslu', priceAdjustment: 0 },
                  { name: 'Sossuz', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'İçecek Seçimi',
                options:[
                  {name: 'Ayran', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acılı', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acısız', priceAdjustment:0},
                  {name: 'Pepsi', priceAdjustment: 10},
                  {name: 'Pepsi-Zero', priceAdjustment:10},
                  {name: 'Yedigün', priceAdjustment:10},
                  {name: '7Up', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Şeftali', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Limon', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Mango', priceAdjustment:10},
                  {name: 'Tropicana Karışık', priceAdjustment:10},
                  {name: 'Tropicana Vişne', priceAdjustment:10},
                  {name: 'Tropicana Şeftali', priceAdjustment:10},
                  {name: 'Taze Sıkılmış Portakal Suyu', priceAdjustment:40},
                ],
                choiceType:'single', isMandatory:true,
              }
            ],
          },
          {
            id: 'dt-m-4',
            name: 'Kaşarlı Tost Menü',
            description: 'Kaşarlı Tost + Patates Kızartması + Dilediğiniz İçecek + Söğüş + İkram Tatlı',
            price: 120,
            imageUrl: 'images/kasarli-tost.jpg',
            category: 'Menüler',
            optionCategories: [
              {
                name: 'Ekmek Seçimi',
                options: [
                  { name: 'Bazlama', priceAdjustment: 5 },
                  { name: 'Ayvalık', priceAdjustment: 0 },
                  { name: 'Sandviç', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Soslu', priceAdjustment: 0 },
                  { name: 'Sossuz', priceAdjustment: 0 },
                  {name: 'Acılı', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Ekstra Malzeme Seçimi',
                options: [
                  { name: 'Ekstra Kaşar', priceAdjustment: 10 },
                ],
                choiceType: 'multi',isMandatory: false,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'İçecek Seçimi',
                options:[
                  {name: 'Ayran', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acılı', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acısız', priceAdjustment:0},
                  {name: 'Pepsi', priceAdjustment: 10},
                  {name: 'Pepsi-Zero', priceAdjustment:10},
                  {name: 'Yedigün', priceAdjustment:10},
                  {name: '7Up', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Şeftali', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Limon', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Mango', priceAdjustment:10},
                  {name: 'Tropicana Karışık', priceAdjustment:10},
                  {name: 'Tropicana Vişne', priceAdjustment:10},
                  {name: 'Tropicana Şeftali', priceAdjustment:10},
                  {name: 'Taze Sıkılmış Portakal Suyu', priceAdjustment:40},
                ],
                choiceType:'single', isMandatory:true,
              }
            ],
          },
          {
            id: 'dt-m-5',
            name: 'Kaşarlı Sucuklu Tost Menü',
            description: 'Kaşarlı Sucuklu Tost + Patates Kızartması + Dilediğiniz İçecek + Söğüş + İkram Tatlı',
            price: 140,
            imageUrl: 'images/kasarli-sucuklu-tost.jpg',
            category: 'Menüler',
            optionCategories: [
              {
                name: 'Ekmek Seçimi',
                options: [
                  { name: 'Bazlama', priceAdjustment: 5 },
                  { name: 'Ayvalık', priceAdjustment: 0 },
                  { name: 'Sandviç', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Soslu', priceAdjustment: 0 },
                  { name: 'Sossuz', priceAdjustment: 0 },
                  {name: 'Acılı', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Ekstra Malzeme Seçimi',
                options: [
                  { name: 'Ekstra Sucuk', priceAdjustment: 5 },
                  { name: 'Ekstra Kaşar', priceAdjustment: 10 },
                ],
                choiceType: 'multi',isMandatory: false,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'İçecek Seçimi',
                options:[
                  {name: 'Ayran', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acılı', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acısız', priceAdjustment:0},
                  {name: 'Pepsi', priceAdjustment: 10},
                  {name: 'Pepsi-Zero', priceAdjustment:10},
                  {name: 'Yedigün', priceAdjustment:10},
                  {name: '7Up', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Şeftali', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Limon', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Mango', priceAdjustment:10},
                  {name: 'Tropicana Karışık', priceAdjustment:10},
                  {name: 'Tropicana Vişne', priceAdjustment:10},
                  {name: 'Tropicana Şeftali', priceAdjustment:10},
                  {name: 'Taze Sıkılmış Portakal Suyu', priceAdjustment:40},
                ],
                choiceType:'single', isMandatory:true,
              }
            ],
          },
          {
            id: 'dt-m-6',
            name: 'Kasap Sucuklu Kaşarlı Tost Menü',
            description: 'Kasap Sucuklu Kaşarlı Tost + Patates Kızartması + Dilediğiniz İçecek + Söğüş + İkram Tatlı',
            price: 160,
            imageUrl: 'images/kasap-sucuklu.jpg',
            category: 'Menüler',
            optionCategories: [
              {
                name: 'Ekmek Seçimi',
                options: [
                  { name: 'Bazlama', priceAdjustment: 5 },
                  { name: 'Ayvalık', priceAdjustment: 0 },
                  { name: 'Sandviç', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Soslu', priceAdjustment: 0 },
                  { name: 'Sossuz', priceAdjustment: 0 },
                  {name: 'Acılı', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Ekstra Malzeme Seçimi',
                options: [
                  { name: 'Ekstra Kasap Sucuk', priceAdjustment: 20 },
                  { name: 'Ekstra Kaşar', priceAdjustment: 10 },
                ],
                choiceType: 'multi',isMandatory: false,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'İçecek Seçimi',
                options:[
                  {name: 'Ayran', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acılı', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acısız', priceAdjustment:0},
                  {name: 'Pepsi', priceAdjustment: 10},
                  {name: 'Pepsi-Zero', priceAdjustment:10},
                  {name: 'Yedigün', priceAdjustment:10},
                  {name: '7Up', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Şeftali', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Limon', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Mango', priceAdjustment:10},
                  {name: 'Tropicana Karışık', priceAdjustment:10},
                  {name: 'Tropicana Vişne', priceAdjustment:10},
                  {name: 'Tropicana Şeftali', priceAdjustment:10},
                  {name: 'Taze Sıkılmış Portakal Suyu', priceAdjustment:40},
                ],
                choiceType:'single', isMandatory:true,
              }
            ],
          },
          {
            id: 'dt-m-7',
            name: 'Kavurmalı Kaşarlı Tost Menü',
            description: 'Kavurmalı Kaşarlı Tost + Patates Kızartması + Dilediğiniz İçecek + Söğüş + İkram Tatlı',
            price: 185,
            imageUrl: 'images/kavurma-kasar.jpg',
            category: 'Menüler',
            optionCategories: [
              {
                name: 'Ekmek Seçimi',
                options: [
                  { name: 'Bazlama', priceAdjustment: 5 },
                  { name: 'Ayvalık', priceAdjustment: 0 },
                  { name: 'Sandviç', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Soslu', priceAdjustment: 0 },
                  { name: 'Sossuz', priceAdjustment: 0 },
                  {name: 'Acılı', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Ekstra Malzeme Seçimi',
                options: [
                  { name: 'Ekstra Kavurma', priceAdjustment: 20 },
                  { name: 'Ekstra Kaşar', priceAdjustment: 10 },
                ],
                choiceType: 'multi',isMandatory: false,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'İçecek Seçimi',
                options:[
                  {name: 'Ayran', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acılı', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acısız', priceAdjustment:0},
                  {name: 'Pepsi', priceAdjustment: 10},
                  {name: 'Pepsi-Zero', priceAdjustment:10},
                  {name: 'Yedigün', priceAdjustment:10},
                  {name: '7Up', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Şeftali', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Limon', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Mango', priceAdjustment:10},
                  {name: 'Tropicana Karışık', priceAdjustment:10},
                  {name: 'Tropicana Vişne', priceAdjustment:10},
                  {name: 'Tropicana Şeftali', priceAdjustment:10},
                  {name: 'Taze Sıkılmış Portakal Suyu', priceAdjustment:40},
                ],
                choiceType:'single', isMandatory:true,
              }
            ],
          },
          {
            id: 'dt-m-8',
            name: 'Cheddarlı Kaşarlı Tost Menü',
            description: 'Cheddarlı Kaşarlı Tost + Patates Kızartması + Dilediğiniz İçecek + Söğüş + İkram Tatlı',
            price: 160,
            imageUrl: 'images/cheddar-kasar.jpg',
            category: 'Menüler',
            optionCategories: [
              {
                name: 'Ekmek Seçimi',
                options: [
                  { name: 'Bazlama', priceAdjustment: 5 },
                  { name: 'Ayvalık', priceAdjustment: 0 },
                  { name: 'Sandviç', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Ekstra Malzeme Seçimi',
                options: [
                  { name: 'Ekstra Cheddar', priceAdjustment: 20 },
                  { name: 'Ekstra Kaşar', priceAdjustment: 10 },
                ],
                choiceType: 'multi',isMandatory: false,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'İçecek Seçimi',
                options:[
                  {name: 'Ayran', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acılı', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acısız', priceAdjustment:0},
                  {name: 'Pepsi', priceAdjustment: 10},
                  {name: 'Pepsi-Zero', priceAdjustment:10},
                  {name: 'Yedigün', priceAdjustment:10},
                  {name: '7Up', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Şeftali', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Limon', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Mango', priceAdjustment:10},
                  {name: 'Tropicana Karışık', priceAdjustment:10},
                  {name: 'Tropicana Vişne', priceAdjustment:10},
                  {name: 'Tropicana Şeftali', priceAdjustment:10},
                  {name: 'Taze Sıkılmış Portakal Suyu', priceAdjustment:40},
                ],
                choiceType:'single', isMandatory:true,
              }
            ],
          },
          {
            id: 'dt-m-9',
            name: '3 Peynirli Tost Menü',
            description: '3 Peynirli Tost + Patates Kızartması + Dilediğiniz İçecek + Söğüş + İkram Tatlı',
            price: 180,
            imageUrl: 'images/cheddar-kasar.jpg',
            category: 'Menüler',
            optionCategories: [
              {
                name: 'Ekmek Seçimi',
                options: [
                  { name: 'Bazlama', priceAdjustment: 5 },
                  { name: 'Ayvalık', priceAdjustment: 0 },
                  { name: 'Sandviç', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Ekstra Malzeme Seçimi',
                options: [
                  { name: 'Ekstra Cheddar', priceAdjustment: 15 },
                  {name: 'Ekstra Labne', priceAdjustment: 10},
                  { name: 'Ekstra Kaşar', priceAdjustment: 10 },
                ],
                choiceType: 'multi',isMandatory: false,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'İçecek Seçimi',
                options:[
                  {name: 'Ayran', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acılı', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acısız', priceAdjustment:0},
                  {name: 'Pepsi', priceAdjustment: 10},
                  {name: 'Pepsi-Zero', priceAdjustment:10},
                  {name: 'Yedigün', priceAdjustment:10},
                  {name: '7Up', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Şeftali', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Limon', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Mango', priceAdjustment:10},
                  {name: 'Tropicana Karışık', priceAdjustment:10},
                  {name: 'Tropicana Vişne', priceAdjustment:10},
                  {name: 'Tropicana Şeftali', priceAdjustment:10},
                  {name: 'Taze Sıkılmış Portakal Suyu', priceAdjustment:40},
                ],
                choiceType:'single', isMandatory:true,
              }
            ],
          },
          {
            id: 'dt-m-10',
            name: 'Dana Salamlı Kaşarlı Tost Menü',
            description: 'Dana Salamlı Kaşarlı Tost + Patates Kızartması + Dilediğiniz İçecek + Söğüş + İkram Tatlı',
            price: 210,
            imageUrl: 'images/generic-tost.jpg',
            category: 'Menüler',
            optionCategories: [
              {
                name: 'Ekmek Seçimi',
                options: [
                  { name: 'Bazlama', priceAdjustment: 5 },
                  { name: 'Ayvalık', priceAdjustment: 0 },
                  { name: 'Sandviç', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Soslu', priceAdjustment: 0 },
                  { name: 'Sossuz', priceAdjustment: 0 },
                  {name: 'Acılı', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Ekstra Malzeme Seçimi',
                options: [
                  { name: 'Ekstra Dana Salam', priceAdjustment: 20 },
                  { name: 'Ekstra Kaşar', priceAdjustment: 10 },
                ],
                choiceType: 'multi',isMandatory: false,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'İçecek Seçimi',
                options:[
                  {name: 'Ayran', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acılı', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acısız', priceAdjustment:0},
                  {name: 'Pepsi', priceAdjustment: 10},
                  {name: 'Pepsi-Zero', priceAdjustment:10},
                  {name: 'Yedigün', priceAdjustment:10},
                  {name: '7Up', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Şeftali', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Limon', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Mango', priceAdjustment:10},
                  {name: 'Tropicana Karışık', priceAdjustment:10},
                  {name: 'Tropicana Vişne', priceAdjustment:10},
                  {name: 'Tropicana Şeftali', priceAdjustment:10},
                  {name: 'Taze Sıkılmış Portakal Suyu', priceAdjustment:40},
                ],
                choiceType:'single', isMandatory:true,
              }
            ],
          },
          {
            id: 'dt-m-11',
            name: 'Dana Jambonlu Kaşarlı Tost Menü',
            description: 'Dana Jambonlu Kaşarlı Tost + Patates Kızartması + Dilediğiniz İçecek + Söğüş + İkram Tatlı',
            price: 210,
            imageUrl: 'images/generic-tost.jpg',
            category: 'Menüler',
            optionCategories: [
              {
                name: 'Ekmek Seçimi',
                options: [
                  { name: 'Bazlama', priceAdjustment: 5 },
                  { name: 'Ayvalık', priceAdjustment: 0 },
                  { name: 'Sandviç', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Soslu', priceAdjustment: 0 },
                  { name: 'Sossuz', priceAdjustment: 0 },
                  {name: 'Acılı', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Ekstra Malzeme Seçimi',
                options: [
                  { name: 'Ekstra Dana Jambon', priceAdjustment: 20 },
                  { name: 'Ekstra Kaşar', priceAdjustment: 10 },
                ],
                choiceType: 'multi',isMandatory: false,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'İçecek Seçimi',
                options:[
                  {name: 'Ayran', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acılı', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acısız', priceAdjustment:0},
                  {name: 'Pepsi', priceAdjustment: 10},
                  {name: 'Pepsi-Zero', priceAdjustment:10},
                  {name: 'Yedigün', priceAdjustment:10},
                  {name: '7Up', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Şeftali', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Limon', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Mango', priceAdjustment:10},
                  {name: 'Tropicana Karışık', priceAdjustment:10},
                  {name: 'Tropicana Vişne', priceAdjustment:10},
                  {name: 'Tropicana Şeftali', priceAdjustment:10},
                  {name: 'Taze Sıkılmış Portakal Suyu', priceAdjustment:40},
                ],
                choiceType:'single', isMandatory:true,
              }
            ],
          },
          {
            id: 'dt-m-12',
            name: 'Dana Baconlu Tost Menü',
            description: 'Dana Baconlu Tost + Patates Kızartması + Dilediğiniz İçecek + Söğüş + İkram Tatlı',
            price: 235,
            imageUrl: 'images/generic-tost.jpg',
            category: 'Menüler',
            optionCategories: [
              {
                name: 'Ekmek Seçimi',
                options: [
                  { name: 'Bazlama', priceAdjustment: 5 },
                  { name: 'Ayvalık', priceAdjustment: 0 },
                  { name: 'Sandviç', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Soslu', priceAdjustment: 0 },
                  { name: 'Sossuz', priceAdjustment: 0 },
                  {name: 'Acılı', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Ekstra Malzeme Seçimi',
                options: [
                  { name: 'Ekstra Dana Bacon', priceAdjustment: 25 },
                  { name: 'Ekstra Kaşar', priceAdjustment: 10 },
                ],
                choiceType: 'multi',isMandatory: false,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'İçecek Seçimi',
                options:[
                  {name: 'Ayran', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acılı', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acısız', priceAdjustment:0},
                  {name: 'Pepsi', priceAdjustment: 10},
                  {name: 'Pepsi-Zero', priceAdjustment:10},
                  {name: 'Yedigün', priceAdjustment:10},
                  {name: '7Up', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Şeftali', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Limon', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Mango', priceAdjustment:10},
                  {name: 'Tropicana Karışık', priceAdjustment:10},
                  {name: 'Tropicana Vişne', priceAdjustment:10},
                  {name: 'Tropicana Şeftali', priceAdjustment:10},
                  {name: 'Taze Sıkılmış Portakal Suyu', priceAdjustment:40},
                ],
                choiceType:'single', isMandatory:true,
              }
            ],
          },
          {
            id: 'dt-m-13',
            name: 'Füme Roastbeefli Kaşarlı Tost Menü',
            description: 'Füme Roastbeefli Kaşarlı Tost + Patates Kızartması + Dilediğiniz İçecek + Söğüş + İkram Tatlı',
            price: 235,
            imageUrl: 'images/generic-tost.jpg',
            category: 'Menüler',
            optionCategories: [
              {
                name: 'Ekmek Seçimi',
                options: [
                  { name: 'Bazlama', priceAdjustment: 5 },
                  { name: 'Ayvalık', priceAdjustment: 0 },
                  { name: 'Sandviç', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Soslu', priceAdjustment: 0 },
                  { name: 'Sossuz', priceAdjustment: 0 },
                  {name: 'Acılı', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Ekstra Malzeme Seçimi',
                options: [
                  { name: 'Ekstra Roastbeef', priceAdjustment: 30 },
                  { name: 'Ekstra Kaşar', priceAdjustment: 10 },
                ],
                choiceType: 'multi',isMandatory: false,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'İçecek Seçimi',
                options:[
                  {name: 'Ayran', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acılı', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acısız', priceAdjustment:0},
                  {name: 'Pepsi', priceAdjustment: 10},
                  {name: 'Pepsi-Zero', priceAdjustment:10},
                  {name: 'Yedigün', priceAdjustment:10},
                  {name: '7Up', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Şeftali', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Limon', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Mango', priceAdjustment:10},
                  {name: 'Tropicana Karışık', priceAdjustment:10},
                  {name: 'Tropicana Vişne', priceAdjustment:10},
                  {name: 'Tropicana Şeftali', priceAdjustment:10},
                  {name: 'Taze Sıkılmış Portakal Suyu', priceAdjustment:40},
                ],
                choiceType:'single', isMandatory:true,
              }
            ],
          }
        ]
      },
      {
        name: 'Yanlar',
        items: [
          {
            id: 'dt-y-1',
            name: 'Patates Kızartması',
            description: 'İsteğe Göre Baharatlı',
            price: 40,
            imageUrl: 'images/patates.jpg',
            category: 'Yanlar',
            optionCategories: [
              {
                name: 'Baharat Seçimi',
                options: [
                  { name: 'Baharatlı', priceAdjustment: 0 },
                  { name: 'Baharatsız', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
          {
            id: 'dt-y-2',
            name: 'Soğan Halkası',
            description: '6 adet',
            price: 40,
            imageUrl: 'images/sogan.jpg',
            category: 'Yanlar',
            optionCategories: [
              {
                name: 'Baharat Seçimi',
                options: [
                  { name: 'Baharatlı', priceAdjustment: 0 },
                  { name: 'Baharatsız', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
          {
            id: 'dt-y-3',
            name: 'Nugget',
            description: 'Kızarmış Nugget 6 adet',
            price: 50,
            imageUrl: 'images/nugget.jpg',
            category: 'Yanlar',
            optionCategories: [
              {
                name: 'Baharat Seçimi',
                options: [
                  { name: 'Baharatlı', priceAdjustment: 0 },
                  { name: 'Baharatsız', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
          {
            id: 'dt-y-4',
            name: 'Tavuk Topları',
            description: 'İsteğe Göre Tavuk Baharatı İle, 10 adet',
            price: 50,
            imageUrl: 'images/tavuk-topu.jpg',
            category: 'Yanlar',
            optionCategories: [
              {
                name: 'Baharat Seçimi',
                options: [
                  { name: 'Baharatlı', priceAdjustment: 0 },
                  { name: 'Baharatsız', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
          {
            id: 'dt-y-5',
            name: 'Mozzarella Sticks',
            description: 'Kızarmış Mozzarella Peyniri, 6 adet',
            price: 75,
            imageUrl: 'images/mozzarella.jpg',
            category: 'Yanlar',
            optionCategories: [
              {
                name: 'Baharat Seçimi',
                options: [
                  { name: 'Baharatlı', priceAdjustment: 0 },
                  { name: 'Baharatsız', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          }
        ]
      },
      {
        name: 'İçecekler',
        items: [
           {
            id: 'dt-i-1',
            name: 'Taze Sıkılmış Portakal Suyu',
            description: 'Taptaze, Şişelenmiş Şekilde Servis Edilir',
            price: 75,
            imageUrl: 'images/portakal.jpg',
            category: 'İçecekler'
          },
           {
            id: 'dt-i-2',
            name: 'Pepsi',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/pepsi.jpg',
            category: 'İçecekler'
          },
           {
            id: 'dt-i-3',
            name: 'Pepsi Zero Sugar',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/pepsi-zero.jpg',
            category: 'İçecekler'
          },
           {
            id: 'dt-i-4',
            name: 'Yedigün',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/yedigun.jpg',
            category: 'İçecekler'
          },
           {
            id: 'dt-i-5',
            name: '7Up',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/7up.jpg',
            category: 'İçecekler'
          },
           {
            id: 'dt-i-6',
            name: 'Lipton Ice Tea',
            description: 'Limon - Şeftali - Mango ',
            price: 40,
            imageUrl: 'images/icetea.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Ice Tea Seçimi',
                options: [
                  { name: 'Limon', priceAdjustment: 0 },
                  { name: 'Şeftali', priceAdjustment: 0 },
                  {name: 'Mango', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              
            ],
          },
           {
            id: 'dt-i-7',
            name: 'Tropicana Meyve Suyu',
            description: 'Vişne - Karışık - Şeftali',
            price: 40,
            imageUrl: 'images/tropicana.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Tropicana Seçimi',
                options: [
                  { name: 'Vişne', priceAdjustment: 0 },
                  { name: 'Şeftali', priceAdjustment: 0 },
                  {name: 'Karışık', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
           {
            id: 'dt-i-8',
            name: 'Sek Ayran (28.5 cl)',
            description: 'Eker Ayran Büyük',
            price: 30,
            imageUrl: 'images/ayran.jpg',
            category: 'İçecekler'
          },
           {
            id: 'dt-i-9',
            name: 'Doğanay Gurme Şalgam',
            description: 'Acılı - Acısız',
            price: 20,
            imageUrl: 'images/doganay.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Acı Seçimi',
                options: [
                  { name: 'Acılı', priceAdjustment: 0 },
                  { name: 'Acısız', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
           {
            id: 'dt-i-10',
            name: 'Çay',
            description: 'Çeşitler İçin Personele Danışınız',
            price: 30,
            imageUrl: 'images/cay.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Çay Seçimi',
                options: [
                  { name: 'Earl Grey', priceAdjustment: 0 },
                  { name: 'Black Label', priceAdjustment: 0 },
                  { name: 'Yeşil Çay', priceAdjustment: 0 },
                  { name: 'Kuşburnu', priceAdjustment: 0 },
                  { name: 'Karışık Meyve', priceAdjustment: 0 },
                  { name: 'Detox', priceAdjustment: 0 },
                  { name: 'Kolajen', priceAdjustment: 0 },
                  { name: 'Enerji', priceAdjustment: 0 },
                  { name: 'Şeftali', priceAdjustment: 0 },
                  { name: 'Ananas', priceAdjustment: 0 },
                  { name: 'Mistik', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
          
        ]
      },
      {
        name: 'Tatlılar',
        items: [
          {
            id: 'dt-ta-1',
            name: 'Nutellalı Bazlama Tost',
            description: 'Bazlama Ekmeğinde Nutella',
            price: 60,
            imageUrl: 'images/nutella-baz.jpg',
            category: 'Tatlılar'
          },
          {
            id: 'dt-ta-2',
            name: 'Dost PB&J',
            description: 'Yer fısıtığı ezmesi ve çilek reçelinin enfes uyumu',
            price: 60,
            imageUrl: 'images/dost-pbj.jpg',
            category: 'Tatlılar'
          },
          {
            id: 'dt-ta-3',
            name: 'Reçelli Labneli Tost',
            description: 'Taptaze Labne Peyniri, Üzerine Çilek Reçeli, Çocukluğunuzdan Bir Parça',
            price: 60,
            imageUrl: 'images/dost-pbj.jpg',
            category: 'Tatlılar'
          },
          {
            id: 'dt-ta-4',
            name: 'Çikolatalı Donut',
            description: '40 gr. Çikolatalı Donut',
            price: 25,
            imageUrl: 'images/donut.jpg',
            category: 'Tatlılar'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Hart Dog',
    logoUrl: 'logos/hart-dog.jpg',
    categories: [
      {
        name: 'Hot Dogs',
        items: [
          {
            id: 'hd--d-1',
            name: 'Hart Dog',
            description: 'Özel Piliç Sosis, İsteğe Göre Turşu + Kıtır Soğan + Patates Kızartması, Dilediğiniz Soslar İle',
            price: 100,
            imageUrl: 'images/hart-dog.jpg',
            category: 'Hot Dogs',
            optionCategories: [
              {
                name: 'Kıtır Soğan Seçimi',
                options: [
                  { name: 'Kıtır Soğan istiyorum', priceAdjustment: 0 },
                  { name: 'Kıtır Soğan istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Turşu Seçimi',
                options: [
                  { name: 'Turşu istiyorum', priceAdjustment: 0 },
                  { name: 'Turşu istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Patates Seçimi',
                options: [
                  { name: 'Patates Olsun', priceAdjustment: 0 },
                  { name: 'Patates Olmasın', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
          {
            id: 'hd-d-2',
            name: 'Kasap Dog',
            description: 'Dana sosis, İsteğe Göre Turşu + Kıtır Soğan + Patates Kızartması, Dilediğiniz Soslar İle',
            price: 125,
            imageUrl: 'images/kasap-dog.jpg',
            category: 'Hot Dogs',
            optionCategories: [
              {
                name: 'Kıtır Soğan Seçimi',
                options: [
                  { name: 'Kıtır Soğan istiyorum', priceAdjustment: 0 },
                  { name: 'Kıtır Soğan istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Turşu Seçimi',
                options: [
                  { name: 'Turşu istiyorum', priceAdjustment: 0 },
                  { name: 'Turşu istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Patates Seçimi',
                options: [
                  { name: 'Patates Olsun', priceAdjustment: 0 },
                  { name: 'Patates Olmasın', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
           {
            id: 'hd-d-3',
            name: 'Double Kasap Dog',
            description: 'Duble Dana sosis, İsteğe Göre Turşu + Kıtır Soğan + Patates Kızartması, Dilediğiniz Soslar İle',
            price: 150,
            imageUrl: 'images/double-kd.jpg',
            category: 'Hot Dogs',
            optionCategories: [
              {
                name: 'Kıtır Soğan Seçimi',
                options: [
                  { name: 'Kıtır Soğan istiyorum', priceAdjustment: 0 },
                  { name: 'Kıtır Soğan istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Turşu Seçimi',
                options: [
                  { name: 'Turşu istiyorum', priceAdjustment: 0 },
                  { name: 'Turşu istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Patates Seçimi',
                options: [
                  { name: 'Patates Olsun', priceAdjustment: 0 },
                  { name: 'Patates Olmasın', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
           {
            id: 'hd-d-4',
            name: 'Special Dog',
            description: 'Dana sosis + Dana Bacon, İsteğe Göre Turşu + Kıtır Soğan + Patates Kızartması, Dilediğiniz Soslar İle',
            price: 150,
            imageUrl: 'images/kasap-dog.jpg',
            category: 'Hot Dogs',
            optionCategories: [
              {
                name: 'Kıtır Soğan Seçimi',
                options: [
                  { name: 'Kıtır Soğan istiyorum', priceAdjustment: 0 },
                  { name: 'Kıtır Soğan istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Turşu Seçimi',
                options: [
                  { name: 'Turşu istiyorum', priceAdjustment: 0 },
                  { name: 'Turşu istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Patates Seçimi',
                options: [
                  { name: 'Patates Olsun', priceAdjustment: 0 },
                  { name: 'Patates Olmasın', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
           {
            id: 'hd-d-5',
            name: 'PatDog',
            description: 'Patso, İsteğe Göre Turşu + Kıtır Soğan + Patates Kızartması, Dilediğiniz Soslar İle',
            price: 75,
            imageUrl: 'images/patdog.jpg',
            category: 'Hot Dogs',
            optionCategories: [
              {
                name: 'Kıtır Soğan Seçimi',
                options: [
                  { name: 'Kıtır Soğan istiyorum', priceAdjustment: 0 },
                  { name: 'Kıtır Soğan istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Turşu Seçimi',
                options: [
                  { name: 'Turşu istiyorum', priceAdjustment: 0 },
                  { name: 'Turşu istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          }
        ]
      },
      {
        name: 'Menüler',
        items: [
           {
            id: 'hd-m-1',
            name: 'Hart Dog Menü',
            description: 'Hart Dog + Patates Kızartması + Dilediğiniz Kutu İçecek',
            price: 160,
            imageUrl: 'images/hart-dog-m.jpg',
            category: 'Menüler',
            optionCategories: [
              {
                name: 'Kıtır Soğan Seçimi',
                options: [
                  { name: 'Kıtır Soğan istiyorum', priceAdjustment: 0 },
                  { name: 'Kıtır Soğan istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Turşu Seçimi',
                options: [
                  { name: 'Turşu istiyorum', priceAdjustment: 0 },
                  { name: 'Turşu istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Patates Seçimi',
                options: [
                  { name: 'Patates Olsun', priceAdjustment: 0 },
                  { name: 'Patates Olmasın', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'İçecek Seçimi',
                options:[
                  {name: 'Ayran', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acılı', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acısız', priceAdjustment:0},
                  {name: 'Pepsi', priceAdjustment: 10},
                  {name: 'Pepsi-Zero', priceAdjustment:10},
                  {name: 'Yedigün', priceAdjustment:10},
                  {name: '7Up', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Şeftali', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Limon', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Mango', priceAdjustment:10},
                  {name: 'Tropicana Karışık', priceAdjustment:10},
                  {name: 'Tropicana Vişne', priceAdjustment:10},
                  {name: 'Tropicana Şeftali', priceAdjustment:10},
                  {name: 'Taze Sıkılmış Portakal Suyu', priceAdjustment:40},
                ],
                choiceType:'single', isMandatory:true,
              }
            ],
          },
          {
            id: 'hd-m-2',
            name: 'Kasap Dog Menü',
            description: 'Kasap Dog + Patates Kızartması + Dilediğiniz Kutu İçecek',
            price: 185,
            imageUrl: 'images/hart-dog-m.jpg',
            category: 'Menüler',
            optionCategories: [
              {
                name: 'Kıtır Soğan Seçimi',
                options: [
                  { name: 'Kıtır Soğan istiyorum', priceAdjustment: 0 },
                  { name: 'Kıtır Soğan istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Turşu Seçimi',
                options: [
                  { name: 'Turşu istiyorum', priceAdjustment: 0 },
                  { name: 'Turşu istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Patates Seçimi',
                options: [
                  { name: 'Patates Olsun', priceAdjustment: 0 },
                  { name: 'Patates Olmasın', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'İçecek Seçimi',
                options:[
                  {name: 'Ayran', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acılı', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acısız', priceAdjustment:0},
                  {name: 'Pepsi', priceAdjustment: 10},
                  {name: 'Pepsi-Zero', priceAdjustment:10},
                  {name: 'Yedigün', priceAdjustment:10},
                  {name: '7Up', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Şeftali', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Limon', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Mango', priceAdjustment:10},
                  {name: 'Tropicana Karışık', priceAdjustment:10},
                  {name: 'Tropicana Vişne', priceAdjustment:10},
                  {name: 'Tropicana Şeftali', priceAdjustment:10},
                  {name: 'Taze Sıkılmış Portakal Suyu', priceAdjustment:40},
                ],
                choiceType:'single', isMandatory:true,
              }
            ],
          },
           {
            id: 'hd-m-3',
            name: 'Double Kasap Dog Menü',
            description: 'Double Kasap Dog + Patates Kızartması + Dilediğiniz Kutu İçecek',
            price: 210,
            imageUrl: 'images/hart-dog-m.jpg',
            category: 'Menüler',
            optionCategories: [
              {
                name: 'Kıtır Soğan Seçimi',
                options: [
                  { name: 'Kıtır Soğan istiyorum', priceAdjustment: 0 },
                  { name: 'Kıtır Soğan istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Turşu Seçimi',
                options: [
                  { name: 'Turşu istiyorum', priceAdjustment: 0 },
                  { name: 'Turşu istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Patates Seçimi',
                options: [
                  { name: 'Patates Olsun', priceAdjustment: 0 },
                  { name: 'Patates Olmasın', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'İçecek Seçimi',
                options:[
                  {name: 'Ayran', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acılı', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acısız', priceAdjustment:0},
                  {name: 'Pepsi', priceAdjustment: 10},
                  {name: 'Pepsi-Zero', priceAdjustment:10},
                  {name: 'Yedigün', priceAdjustment:10},
                  {name: '7Up', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Şeftali', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Limon', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Mango', priceAdjustment:10},
                  {name: 'Tropicana Karışık', priceAdjustment:10},
                  {name: 'Tropicana Vişne', priceAdjustment:10},
                  {name: 'Tropicana Şeftali', priceAdjustment:10},
                  {name: 'Taze Sıkılmış Portakal Suyu', priceAdjustment:40},
                ],
                choiceType:'single', isMandatory:true,
              }
            ],
          },
           {
            id: 'hd-m-4',
            name: 'Special Dog Menü',
            description: 'Special Dog + Patates Kızartması + Dilediğiniz Kutu İçecek',
            price: 210,
            imageUrl: 'images/hart-dog-m.jpg',
            category: 'Menüler',
            optionCategories: [
              {
                name: 'Kıtır Soğan Seçimi',
                options: [
                  { name: 'Kıtır Soğan istiyorum', priceAdjustment: 0 },
                  { name: 'Kıtır Soğan istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Turşu Seçimi',
                options: [
                  { name: 'Turşu istiyorum', priceAdjustment: 0 },
                  { name: 'Turşu istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Patates Seçimi',
                options: [
                  { name: 'Patates Olsun', priceAdjustment: 0 },
                  { name: 'Patates Olmasın', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'İçecek Seçimi',
                options:[
                  {name: 'Ayran', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acılı', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acısız', priceAdjustment:0},
                  {name: 'Pepsi', priceAdjustment: 10},
                  {name: 'Pepsi-Zero', priceAdjustment:10},
                  {name: 'Yedigün', priceAdjustment:10},
                  {name: '7Up', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Şeftali', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Limon', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Mango', priceAdjustment:10},
                  {name: 'Tropicana Karışık', priceAdjustment:10},
                  {name: 'Tropicana Vişne', priceAdjustment:10},
                  {name: 'Tropicana Şeftali', priceAdjustment:10},
                  {name: 'Taze Sıkılmış Portakal Suyu', priceAdjustment:40},
                ],
                choiceType:'single', isMandatory:true,
              }
            ],
          },
           {
            id: 'hd-m-5',
            name: 'PatDog Menü',
            description: 'Pat Dog + Patates Kızartması + Dilediğiniz Kutu İçecek',
            price: 135,
            imageUrl: 'images/hart-dog-m.jpg',
            category: 'Menüler',
            optionCategories: [
              {
                name: 'Kıtır Soğan Seçimi',
                options: [
                  { name: 'Kıtır Soğan istiyorum', priceAdjustment: 0 },
                  { name: 'Kıtır Soğan istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Turşu Seçimi',
                options: [
                  { name: 'Turşu istiyorum', priceAdjustment: 0 },
                  { name: 'Turşu istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'İçecek Seçimi',
                options:[
                  {name: 'Ayran', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acılı', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acısız', priceAdjustment:0},
                  {name: 'Pepsi', priceAdjustment: 10},
                  {name: 'Pepsi-Zero', priceAdjustment:10},
                  {name: 'Yedigün', priceAdjustment:10},
                  {name: '7Up', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Şeftali', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Limon', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Mango', priceAdjustment:10},
                  {name: 'Tropicana Karışık', priceAdjustment:10},
                  {name: 'Tropicana Vişne', priceAdjustment:10},
                  {name: 'Tropicana Şeftali', priceAdjustment:10},
                  {name: 'Taze Sıkılmış Portakal Suyu', priceAdjustment:40},
                ],
                choiceType:'single', isMandatory:true,
              }
            ],
          }
        ]
      },
      {
        name: 'Yanlar',
        items: [
          {
            id: 'hd-y-1',
            name: 'Patates Kızartması',
            description: 'İsteğe Göre Baharatlı',
            price: 40,
            imageUrl: 'images/patates.jpg',
            category: 'Yanlar',
            optionCategories: [
              {
                name: 'Baharat Seçimi',
                options: [
                  { name: 'Baharatlı', priceAdjustment: 0 },
                  { name: 'Baharatsız', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
          {
            id: 'hd-y-2',
            name: 'Soğan Halkası',
            description: '6 adet',
            price: 40,
            imageUrl: 'images/sogan.jpg',
            category: 'Yanlar',
            optionCategories: [
              {
                name: 'Baharat Seçimi',
                options: [
                  { name: 'Baharatlı', priceAdjustment: 0 },
                  { name: 'Baharatsız', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
          {
            id: 'hd-y-3',
            name: 'Nugget',
            description: 'Kızarmış Nugget 6 adet',
            price: 50,
            imageUrl: 'images/nugget.jpg',
            category: 'Yanlar',
            optionCategories: [
              {
                name: 'Baharat Seçimi',
                options: [
                  { name: 'Baharatlı', priceAdjustment: 0 },
                  { name: 'Baharatsız', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
          {
            id: 'hd-y-4',
            name: 'Tavuk Topları',
            description: 'İsteğe Göre Tavuk Baharatı İle, 10 adet',
            price: 50,
            imageUrl: 'images/tavuk-topu.jpg',
            category: 'Yanlar',
            optionCategories: [
              {
                name: 'Baharat Seçimi',
                options: [
                  { name: 'Baharatlı', priceAdjustment: 0 },
                  { name: 'Baharatsız', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
          {
            id: 'hd-y-5',
            name: 'Mozzarella Sticks',
            description: 'Kızarmış Mozzarella Peyniri, 6 adet',
            price: 75,
            imageUrl: 'images/mozzarella.jpg',
            category: 'Yanlar',
            optionCategories: [
              {
                name: 'Baharat Seçimi',
                options: [
                  { name: 'Baharatlı', priceAdjustment: 0 },
                  { name: 'Baharatsız', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          }
        ]
      },
      {
        name: 'İçecekler',
        items: [
           {
            id: 'hd-i-1',
            name: 'Taze Sıkılmış Portakal Suyu',
            description: 'Taptaze, Şişelenmiş Şekilde Servis Edilir',
            price: 75,
            imageUrl: 'images/portakal.jpg',
            category: 'İçecekler'
          },
           {
            id: 'hd-i-2',
            name: 'Pepsi',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/pepsi.jpg',
            category: 'İçecekler'
          },
           {
            id: 'hd-i-3',
            name: 'Pepsi Zero Sugar',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/pepsi-zero.jpg',
            category: 'İçecekler'
          },
           {
            id: 'hd-i-4',
            name: 'Yedigün',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/yedigun.jpg',
            category: 'İçecekler'
          },
           {
            id: 'hd-i-5',
            name: '7Up',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/7up.jpg',
            category: 'İçecekler'
          },
          {
            id: 'hd-i-6',
            name: 'Lipton Ice Tea',
            description: 'Limon - Şeftali - Mango ',
            price: 40,
            imageUrl: 'images/icetea.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Ice Tea Seçimi',
                options: [
                  { name: 'Limon', priceAdjustment: 0 },
                  { name: 'Şeftali', priceAdjustment: 0 },
                  {name: 'Mango', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              
            ],
          },
           {
            id: 'hd-i-7',
            name: 'Tropicana Meyve Suyu',
            description: 'Vişne - Karışık - Şeftali',
            price: 40,
            imageUrl: 'images/tropicana.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Tropicana Seçimi',
                options: [
                  { name: 'Vişne', priceAdjustment: 0 },
                  { name: 'Şeftali', priceAdjustment: 0 },
                  {name: 'Karışık', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
           {
            id: 'hd-i-8',
            name: 'Sek Ayran (28.5 cl)',
            description: 'Eker Ayran Büyük',
            price: 30,
            imageUrl: 'images/ayran.jpg',
            category: 'İçecekler'
          },
           {
            id: 'hd-i-9',
            name: 'Doğanay Gurme Şalgam',
            description: 'Acılı - Acısız',
            price: 20,
            imageUrl: 'images/doganay.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Acı Seçimi',
                options: [
                  { name: 'Acılı', priceAdjustment: 0 },
                  { name: 'Acısız', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
          
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Wonder Waffle',
    logoUrl: 'logos/wonder-waffle.jpg',
    categories: [
      {
        name: 'Wafflelar',
        items: [
          {
            id: 'ww-1',
            name: 'Waffle Kendin Yap Meyveli',
            description: 'Taban Çikolatası Seçimi (Beyaz, Sütlü, Bitter, Karamel) - Malzemelerden İstediğinizi Seçebilirsiniz (Muz, Çilek, Kivi, Çakıltaşı, Bonibon, Sütlü Damla Çikolata, Bitter Damla Çikolata, Beyaz Damla Çikolata, Frambuazlı Damla Çikolata, Bitter Pirinç Patlağı, Beyaz Buğday Patlağı, Hindistan Cevizi) - Soslardan İstediğinizi Seçebilirsiniz (Karamel, Sütlü Çikolata, Bitter, Çilek, Frambuaz, Kivi, Antep Fıstığı, Muz)',
            price: 125,
            imageUrl: 'images/waffle-meyve.jpg',
            category: 'Wafflelar',
            optionCategories: [
              {
                name: 'Meyve Seçimi',
                options: [
                  { name: 'Çilek', priceAdjustment: 0 },
                  { name: 'Muz', priceAdjustment: 0 },
                  {name: 'Kivi', priceAdjustment:0},
                ],
                choiceType: 'multi',isMandatory: true,
              },
              {
                name: 'Taban Çikolatası Seçimi',
                options: [
                  { name: 'Sütlü Taban Çikolata', priceAdjustment: 0 },
                  { name: 'Beyaz Taban Çikolata', priceAdjustment: 0 },
                  {name: 'Bitter Taban Çikolata', priceAdjustment:0},
                  {name: 'Karamel Taban Çikolata', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Süsleme Seçimi',
                options: [
                  { name: 'Sütlü Damla Çikolata', priceAdjustment: 0 },
                  { name: 'Beyaz Damla Çikolata', priceAdjustment: 0 },
                  {name: 'Bitter Damla Çikolata', priceAdjustment:0},
                  {name: 'Frambuaz Damla Çikolata', priceAdjustment:0},
                  {name: 'Bitter Pirinç Patlağı', priceAdjustment:0},
                  {name: 'Beyaz Buğday Patlağı', priceAdjustment:0},
                  {name: 'Bonibon', priceAdjustment:0},
                  {name: 'Çakıltaşı', priceAdjustment:0},
                  {name: 'Vermiçelli', priceAdjustment:0},
                  {name: 'Hindistan Cevizi', priceAdjustment:0},
                ],
                choiceType: 'multi',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Sütlü Çikolata Sos', priceAdjustment: 0 },
                  { name: 'Beyaz Çikolata Sos', priceAdjustment: 0 },
                  {name: 'Bitter Çikolata Sos', priceAdjustment:0},
                  {name: 'Frambuaz Sos', priceAdjustment:0},
                  {name: 'Çilek Sos', priceAdjustment:0},
                  {name: 'Muz Sos', priceAdjustment:0},
                  {name: 'Kivi Sos', priceAdjustment:0},
                  {name: 'Karamel Sos', priceAdjustment:0},
                  {name: 'Vişne Sos', priceAdjustment:0},
                ],
                choiceType: 'multi',isMandatory: true,
              },
            ],
          },
          {
            id: 'ww-2',
            name: 'Waffle Kendin Yap Meyvesiz',
            description: 'Taban Çikolatası Seçimi (Beyaz, Sütlü, Bitter, Karamel) - Malzemelerden İstediğinizi Seçebilirsiniz (Çakıltaşı, Bonibon, Sütlü Damla Çikolata, Bitter Damla Çikolata, Beyaz Damla Çikolata, Frambuazlı Damla Çikolata, Bitter Pirinç Patlağı, Beyaz Buğday Patlağı, Hindistan Cevizi) - Soslardan İstediğinizi Seçebilirsiniz (Karamel, Sütlü Çikolata, Bitter, Çilek, Frambuaz, Kivi, Antep Fıstığı, Muz)',
            price: 100,
            imageUrl: 'images/waffle-meyvesiz.jpg',
            category: 'Tatlı Waffle',
            optionCategories: [{
              name: 'Taban Çikolatası Seçimi',
              options: [
                { name: 'Sütlü Taban Çikolata', priceAdjustment: 0 },
                { name: 'Beyaz Taban Çikolata', priceAdjustment: 0 },
                {name: 'Bitter Taban Çikolata', priceAdjustment:0},
                {name: 'Karamel Taban Çikolata', priceAdjustment:0},
              ],
              choiceType: 'single',isMandatory: true,
            },
            {
              name: 'Süsleme Seçimi',
              options: [
                { name: 'Sütlü Damla Çikolata', priceAdjustment: 0 },
                { name: 'Beyaz Damla Çikolata', priceAdjustment: 0 },
                {name: 'Bitter Damla Çikolata', priceAdjustment:0},
                {name: 'Frambuaz Damla Çikolata', priceAdjustment:0},
                {name: 'Bitter Pirinç Patlağı', priceAdjustment:0},
                {name: 'Beyaz Buğday Patlağı', priceAdjustment:0},
                {name: 'Bonibon', priceAdjustment:0},
                {name: 'Çakıltaşı', priceAdjustment:0},
                {name: 'Vermiçelli', priceAdjustment:0},
                {name: 'Hindistan Cevizi', priceAdjustment:0},
              ],
              choiceType: 'multi',isMandatory: true,
            },
            {
              name: 'Sos Seçimi',
              options: [
                { name: 'Sütlü Çikolata Sos', priceAdjustment: 0 },
                { name: 'Beyaz Çikolata Sos', priceAdjustment: 0 },
                {name: 'Bitter Çikolata Sos', priceAdjustment:0},
                {name: 'Frambuaz Sos', priceAdjustment:0},
                {name: 'Çilek Sos', priceAdjustment:0},
                {name: 'Muz Sos', priceAdjustment:0},
                {name: 'Kivi Sos', priceAdjustment:0},
                {name: 'Karamel Sos', priceAdjustment:0},
                {name: 'Vişne Sos', priceAdjustment:0},
              ],
              choiceType: 'multi',isMandatory: true,
            },],
          }
        ]
      },
     {
        name: 'İçecekler',
        items: [
           {
            id: 'ww-i-1',
            name: 'Taze Sıkılmış Portakal Suyu',
            description: 'Taptaze, Şişelenmiş Şekilde Servis Edilir',
            price: 75,
            imageUrl: 'images/portakal.jpg',
            category: 'İçecekler'
          },
           {
            id: 'ww-i-2',
            name: 'Pepsi',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/pepsi.jpg',
            category: 'İçecekler'
          },
           {
            id: 'ww-i-3',
            name: 'Pepsi Zero Sugar',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/pepsi-zero.jpg',
            category: 'İçecekler'
          },
           {
            id: 'ww-i-4',
            name: 'Yedigün',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/yedigun.jpg',
            category: 'İçecekler'
          },
           {
            id: 'ww-i-5',
            name: '7Up',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/7up.jpg',
            category: 'İçecekler'
          },
          {
            id: 'ww-i-6',
            name: 'Lipton Ice Tea',
            description: 'Limon - Şeftali - Mango ',
            price: 40,
            imageUrl: 'images/icetea.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Ice Tea Seçimi',
                options: [
                  { name: 'Limon', priceAdjustment: 0 },
                  { name: 'Şeftali', priceAdjustment: 0 },
                  {name: 'Mango', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              
            ],
          },
           {
            id: 'ww-i-7',
            name: 'Tropicana Meyve Suyu',
            description: 'Vişne - Karışık - Şeftali',
            price: 40,
            imageUrl: 'images/tropicana.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Tropicana Seçimi',
                options: [
                  { name: 'Vişne', priceAdjustment: 0 },
                  { name: 'Şeftali', priceAdjustment: 0 },
                  {name: 'Karışık', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
           {
            id: 'dt-i-10',
            name: 'Çay',
            description: 'Çeşitler İçin Personele Danışınız',
            price: 30,
            imageUrl: 'images/cay.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Çay Seçimi',
                options: [
                  { name: 'Earl Grey', priceAdjustment: 0 },
                  { name: 'Black Label', priceAdjustment: 0 },
                  { name: 'Yeşil Çay', priceAdjustment: 0 },
                  { name: 'Kuşburnu', priceAdjustment: 0 },
                  { name: 'Karışık Meyve', priceAdjustment: 0 },
                  { name: 'Detox', priceAdjustment: 0 },
                  { name: 'Kolajen', priceAdjustment: 0 },
                  { name: 'Enerji', priceAdjustment: 0 },
                  { name: 'Şeftali', priceAdjustment: 0 },
                  { name: 'Ananas', priceAdjustment: 0 },
                  { name: 'Mistik', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
          
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'Pilavneli',
    logoUrl: 'logos/pilavneli.jpg',
    categories: [
      {
        name: 'Pilavlar',
        items: [
          {
            id: 'pv-1',
            name: 'Tavuklu Pilav (75 gr.)',
            description: '75 gram Tiftik Tavuk, Pirinç Pilavı Yanında Söğüş, Turşular, Özel Pilavneli Sosu ve Helva',
            price: 100,
            imageUrl: 'images/tavuklu-pilav.jpg',
            category: 'Pilavlar'
          },
          {
            id: 'pv-2',
            name: 'Tavuklu Nohutlu Pilav (75 gr.)',
            description: '75 gram Tiftik Tavuk, Haşlanmış Nohut , Pirinç Pilavı Yanında Söğüş, Turşular, Özel Pilavneli Sosu ve Helva',
            price: 105,
            imageUrl: 'images/tavuklu-nohutlu.jpg',
            category: 'Pilavlar'
          },
          {
            id: 'pv-3',
            name: 'Duble Tavuklu Pilav (150 gr.)',
            description: '150 gram Tiftik Tavuk, Pirinç Pilavı Yanında Söğüş, Turşular, Özel Pilavneli Sosu ve Helva',
            price: 150,
            imageUrl: 'images/double-tavuk.jpg',
            category: 'Pilavlar'
          },
          {
            id: 'pv-4',
            name: 'Duble Tavuklu Nohutlu Pilav',
            description: '150 gram Tiftik Tavuk, Haşlanmış Nohut, Pirinç Pilavı Yanında Söğüş, Turşular, Özel Pilavneli Sosu ve Helva',
            price: 155,
            imageUrl: 'images/double-tavuk-nohut.jpg',
            category: 'Pilavlar'
          },
          {
            id: 'pv-5',
            name: 'Köri Soslu Tavuklu Pilav',
            description: '150 gram Köri Soslu Tavuk, Pirinç Pilavı Yanında Söğüş, Turşular, Özel Pilavneli Sosu ve Helva',
            price: 150,
            imageUrl: 'images/kori-pilav.jpg',
            category: 'Pilavlar'
          },
          {
            id: 'pv-6',
            name: 'Mantarlı Tavuk Soteli Pilav',
            description: '150 gram Mantarlı Tavuk Sote, Pirinç Pilavı Yanında Söğüş, Turşular, Özel Pilavneli Sosu ve Helva',
            price: 150,
            imageUrl: 'images/mantarli-pilav.jpg',
            category: 'Pilavlar'
          },
           {
            id: 'pv-7',
            name: 'Etli Kuru Fasulyeli Pilav',
            description: '150 gram Etli Kuru Fasulye, Pirinç Pilavı Yanında Söğüş, Turşular, Özel Pilavneli Sosu ve Helva',
            price: 150,
            imageUrl: 'images/fasulyeli-pilav.jpg',
            category: 'Pilavlar'
          }
        ]
      },
      {
        name: 'İçecekler',
        items: [
           {
            id: 'pv-i-1',
            name: 'Taze Sıkılmış Portakal Suyu',
            description: 'Taptaze, Şişelenmiş Şekilde Servis Edilir',
            price: 75,
            imageUrl: 'images/portakal.jpg',
            category: 'İçecekler'
          },
           {
            id: 'pv-i-2',
            name: 'Pepsi',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/pepsi.jpg',
            category: 'İçecekler'
          },
           {
            id: 'pv-i-3',
            name: 'Pepsi Zero Sugar',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/pepsi-zero.jpg',
            category: 'İçecekler'
          },
           {
            id: 'pv-i-4',
            name: 'Yedigün',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/yedigun.jpg',
            category: 'İçecekler'
          },
           {
            id: 'pv-i-5',
            name: '7Up',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/7up.jpg',
            category: 'İçecekler'
          },
          {
            id: 'pv-i-6',
            name: 'Lipton Ice Tea',
            description: 'Limon - Şeftali - Mango ',
            price: 40,
            imageUrl: 'images/icetea.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Ice Tea Seçimi',
                options: [
                  { name: 'Limon', priceAdjustment: 0 },
                  { name: 'Şeftali', priceAdjustment: 0 },
                  {name: 'Mango', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              
            ],
          },
           {
            id: 'pv-i-7',
            name: 'Tropicana Meyve Suyu',
            description: 'Vişne - Karışık - Şeftali',
            price: 40,
            imageUrl: 'images/tropicana.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Tropicana Seçimi',
                options: [
                  { name: 'Vişne', priceAdjustment: 0 },
                  { name: 'Şeftali', priceAdjustment: 0 },
                  {name: 'Karışık', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
           {
            id: 'pv-i-8',
            name: 'Sek Ayran (28.5 cl)',
            description: 'Eker Ayran Büyük',
            price: 30,
            imageUrl: 'images/ayran.jpg',
            category: 'İçecekler'
          },
           {
            id: 'pv-i-9',
            name: 'Doğanay Gurme Şalgam',
            description: 'Acılı - Acısız',
            price: 20,
            imageUrl: 'images/doganay.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Acı Seçimi',
                options: [
                  { name: 'Acılı', priceAdjustment: 0 },
                  { name: 'Acısız', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
        ]
      }
    ]
  },
  {
    id:'5',
    name: 'Çiko Çiğköfte',
    logoUrl: 'logos/ciko-cigkofte.jpg',
    categories: [
      {
        name: 'Dürümler',
        items: [
          {
            id: 'cc-1',
            name: 'Meksika Usulü Çiğköfte Wrap',
            description: 'Tortilla Ekmeğinde 200 gram Çiğ Köfte, Salsa Sosu, Meksika Fasulyesi, Jalapeno Turşusu ve Doritos İle',
            price: 75,
            imageUrl: 'images/meksika.jpg',
            category: 'Dürümler',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Salatalık', priceAdjustment: 0 },
                  {name: 'Marul', priceAdjustment:0},
                  {name: 'Havuç', priceAdjustment:0},
                  {name: 'Turşu', priceAdjustment:0},
                  {name: 'Jalapeno', priceAdjustment:0},
                  {name: 'Yeşil Biber', priceAdjustment:0},
                  {name: 'Kırmızı Biber', priceAdjustment:0},
                  {name: 'Maydonoz', priceAdjustment:0},
                  {name: 'Nane', priceAdjustment:0},
                  {name: 'Roka', priceAdjustment:0},
                ],
                choiceType: 'multi',isMandatory: true,
              },
            ],
          },
          {
            id: 'cc-2',
            name: 'Çiğköfte Taco',
            description: 'Sert Taco Kabuğu Arasında 100 gr. Çiğ Köfte, Salsa Sosu, Meksika Fasulyesi, Jalapeno Turşusu ve Doritos İle',
            price: 60,
            imageUrl: 'images/taco.jpg',
            category: 'Dürümler',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Salatalık', priceAdjustment: 0 },
                  {name: 'Marul', priceAdjustment:0},
                  {name: 'Havuç', priceAdjustment:0},
                  {name: 'Turşu', priceAdjustment:0},
                  {name: 'Jalapeno', priceAdjustment:0},
                  {name: 'Yeşil Biber', priceAdjustment:0},
                  {name: 'Kırmızı Biber', priceAdjustment:0},
                  {name: 'Maydonoz', priceAdjustment:0},
                  {name: 'Nane', priceAdjustment:0},
                  {name: 'Roka', priceAdjustment:0},
                ],
                choiceType: 'multi',isMandatory: true,
              },
            ],
          },
          {
            id: 'cc-3',
            name: 'Çiğköfte Dürüm',
            description: 'Çift Lavaşa 100 gram Çiğ Köfte Ekstra 50 gram ÇiğKöfte = +15 Ekstra Doritos = +5 Ekstra Lavaş = +5 Malzeme Seçimi (Marul, Domates, Turşu, Nane, Roka, Maydonoz, Yeşil Biber, Kırmızı Biber, Nar Ekşisi, Limon Sosu, Acı Sos',
            price: 60,
            imageUrl: 'images/durum.jpg',
            category: 'Dürümler',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Salatalık', priceAdjustment: 0 },
                  {name: 'Marul', priceAdjustment:0},
                  {name: 'Havuç', priceAdjustment:0},
                  {name: 'Turşu', priceAdjustment:0},
                  {name: 'Jalapeno', priceAdjustment:0},
                  {name: 'Yeşil Biber', priceAdjustment:0},
                  {name: 'Kırmızı Biber', priceAdjustment:0},
                  {name: 'Maydonoz', priceAdjustment:0},
                  {name: 'Nane', priceAdjustment:0},
                  {name: 'Roka', priceAdjustment:0},
                ],
                choiceType: 'multi',isMandatory: true,
              },
            ],
          },
        ]
      },
      {
        name: 'Porsiyonlar',
        items: [
          {
            id: 'cc-4',
            name: '250 gr. Porsiyon',
            description: '250 gram Çiğ Köfte Garnitür Lavaş ve Nar Ekşisi İle Servis Edilir',
            price: 75,
            imageUrl: 'images/porsiyon.jpg',
            category: 'Porsiyonlar'
          },
          {
            id: 'cc-5',
            name: '500 gr. Porsiyon',
            description: '500 gram Çiğ Köfte Garnitür Lavaş ve Nar Ekşisi İle Servis Edilir',
            price: 150,
            imageUrl: 'images/porsiyon.jpg',
            category: 'Porsiyonlar'
          },
          {
            id: 'cc-6',
            name: '1000 gr. Porsiyon',
            description: '1000 gram Çiğ Köfte Garnitür Lavaş ve Nar Ekşisi İle Servis Edilir',
            price: 300,
            imageUrl: 'images/porsiyon.jpg',
            category: 'Porsiyonlar'
          }
        ]
      },
      {
        name: 'İçecekler',
        items: [
           {
            id: 'cc-i-2',
            name: 'Pepsi',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/pepsi.jpg',
            category: 'İçecekler'
          },
           {
            id: 'cc-i-3',
            name: 'Pepsi Zero Sugar',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/pepsi-zero.jpg',
            category: 'İçecekler'
          },
           {
            id: 'cc-i-4',
            name: 'Yedigün',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/yedigun.jpg',
            category: 'İçecekler'
          },
           {
            id: 'cc-i-5',
            name: '7Up',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/7up.jpg',
            category: 'İçecekler'
          },
          {
            id: 'cc-i-6',
            name: 'Lipton Ice Tea',
            description: 'Limon - Şeftali - Mango ',
            price: 40,
            imageUrl: 'images/icetea.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Ice Tea Seçimi',
                options: [
                  { name: 'Limon', priceAdjustment: 0 },
                  { name: 'Şeftali', priceAdjustment: 0 },
                  {name: 'Mango', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              
            ],
          },
           {
            id: 'cc-i-7',
            name: 'Tropicana Meyve Suyu',
            description: 'Vişne - Karışık - Şeftali',
            price: 40,
            imageUrl: 'images/tropicana.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Tropicana Seçimi',
                options: [
                  { name: 'Vişne', priceAdjustment: 0 },
                  { name: 'Şeftali', priceAdjustment: 0 },
                  {name: 'Karışık', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
           {
            id: 'cc-i-8',
            name: 'Sek Ayran (28.5 cl)',
            description: 'Eker Ayran Büyük',
            price: 30,
            imageUrl: 'images/ayran.jpg',
            category: 'İçecekler'
          },
           {
            id: 'cc-i-9',
            name: 'Doğanay Gurme Şalgam',
            description: 'Acılı - Acısız',
            price: 20,
            imageUrl: 'images/doganay.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Acı Seçimi',
                options: [
                  { name: 'Acılı', priceAdjustment: 0 },
                  { name: 'Acısız', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
          
        ]
      }
    ]
  },
  {
    id:'6',
    name: '322 Döner',
    logoUrl: 'logos/322-doner.jpg',
    categories: [
      {
      name: 'Dönerler',
      items:[
         {
            id: 'do-d-1',
            name: 'Bazlama Ekmeğinde Tavuk Döner',
            description: '100 Gram Tavuk Döner, 50 Gram Kaşar Peyniri, Özel Domates Sosu İle, Menü +60',
            price: 100,
            imageUrl: 'images/doner-bazlama.jpg',
            category: 'Dönerler',
            optionCategories: [

            {
              name: 'Gramaj Seçimi',
              options: [
                {name: 'Kalsın', priceAdjustment:0},
                {name: '+50 gr', priceAdjustment: 25},
                {name: '+100 gr', priceAdjustment: 50},
              ], choiceType:'single', isMandatory:true,
            }
          ],
          },
         {
            id: 'do-d-2',
            name: 'Lokmalık Tavuk Döner Dürüm',
            description: 'Çift İnce Lavaşa Sarılmış 100 Gram Tavuk Döner, Özel Domates Sosu İle, Menü +60, Malzeme Seçimi (Patates Kızartması, Domates, Marul, Turşu, Jalapeno',
            price: 100,
            imageUrl: 'images/lokma.jpg',
            category: 'Dönerler',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Salatalık', priceAdjustment: 0 },
                  {name: 'Marul', priceAdjustment:0},
                  {name: 'Havuç', priceAdjustment:0},
                  {name: 'Turşu', priceAdjustment:0},
                  {name: 'Jalapeno', priceAdjustment:0},
                  {name: 'Yeşil Biber', priceAdjustment:0},
                  {name: 'Kırmızı Biber', priceAdjustment:0},
                  {name: 'Maydonoz', priceAdjustment:0},
                  {name: 'Nane', priceAdjustment:0},
                  {name: 'Roka', priceAdjustment:0},
                ],
                choiceType: 'multi',isMandatory: true,
              },
              {
                name: 'Gramaj Seçimi',
                options: [
                  {name: 'Kalsın', priceAdjustment:0},
                  {name: '+50 gr', priceAdjustment: 25},
                  {name: '+100 gr', priceAdjustment: 50},
                ], choiceType:'single', isMandatory:true,
              }
            ],
          },
         {
            id: 'do-d-3',
            name: 'Tavuk Döner Wrap',
            description: 'Mısır Tortillasına Sarılmış 100 Gram Tavuk Döner, Özel Domates Sosu İle, Menü +60 Malzeme Seçimi (Patates Kızartması, Domates, Marul, Turşu, Jalapeno',
            price: 110,
            imageUrl: 'images/wrap.jpg',
            category: 'Dönerler',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Salatalık', priceAdjustment: 0 },
                  {name: 'Marul', priceAdjustment:0},
                  {name: 'Havuç', priceAdjustment:0},
                  {name: 'Turşu', priceAdjustment:0},
                  {name: 'Jalapeno', priceAdjustment:0},
                  {name: 'Yeşil Biber', priceAdjustment:0},
                  {name: 'Kırmızı Biber', priceAdjustment:0},
                  {name: 'Maydonoz', priceAdjustment:0},
                  {name: 'Nane', priceAdjustment:0},
                  {name: 'Roka', priceAdjustment:0},
                ],
                choiceType: 'multi',isMandatory: true,
              },
              {
                name: 'Gramaj Seçimi',
                options: [
                  {name: 'Kalsın', priceAdjustment:0},
                  {name: '+50 gr', priceAdjustment: 25},
                  {name: '+100 gr', priceAdjustment: 50},
                ], choiceType:'single', isMandatory:true,
              },
            ],
          }
      ]
        },
      {
        name: 'İçecekler',
        items: [
           {
            id: 'do-i-1',
            name: 'Taze Sıkılmış Portakal Suyu',
            description: 'Taptaze, Şişelenmiş Şekilde Servis Edilir',
            price: 75,
            imageUrl: 'images/portakal.jpg',
            category: 'İçecekler'
          },
           {
            id: 'do-i-2',
            name: 'Pepsi',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/pepsi.jpg',
            category: 'İçecekler'
          },
           {
            id: 'do-i-3',
            name: 'Pepsi Zero Sugar',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/pepsi-zero.jpg',
            category: 'İçecekler'
          },
           {
            id: 'do-i-4',
            name: 'Yedigün',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/yedigun.jpg',
            category: 'İçecekler'
          },
           {
            id: 'do-i-5',
            name: '7Up',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/7up.jpg',
            category: 'İçecekler'
          },
          {
            id: 'do-i-6',
            name: 'Lipton Ice Tea',
            description: 'Limon - Şeftali - Mango ',
            price: 40,
            imageUrl: 'images/icetea.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Ice Tea Seçimi',
                options: [
                  { name: 'Limon', priceAdjustment: 0 },
                  { name: 'Şeftali', priceAdjustment: 0 },
                  {name: 'Mango', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              
            ],
          },
           {
            id: 'do-i-7',
            name: 'Tropicana Meyve Suyu',
            description: 'Vişne - Karışık - Şeftali',
            price: 40,
            imageUrl: 'images/tropicana.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Tropicana Seçimi',
                options: [
                  { name: 'Vişne', priceAdjustment: 0 },
                  { name: 'Şeftali', priceAdjustment: 0 },
                  {name: 'Karışık', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
           {
            id: 'do-i-8',
            name: 'Sek Ayran (28.5 cl)',
            description: 'Eker Ayran Büyük',
            price: 30,
            imageUrl: 'images/ayran.jpg',
            category: 'İçecekler'
          },
           {
            id: 'do-i-9',
            name: 'Doğanay Gurme Şalgam',
            description: 'Acılı - Acısız',
            price: 20,
            imageUrl: 'images/doganay.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Acı Seçimi',
                options: [
                  { name: 'Acılı', priceAdjustment: 0 },
                  { name: 'Acısız', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
        ]
      }
      ]
  },
  {
    id:'7',
    name: 'Tavuk Sepeti',
    logoUrl: 'logos/tavuk-sepeti.jpg',
    categories: [
      {
      name : 'Sepetler',
      items: [
        {
            id: 'ts-s-1',
            name: 'Jumbo Filetolu Sepet',
            description: '200 Gram Jumbo Fileto Patates Kızartması İle, İsteğe Göre Baharat, Soslar ve Kıtır Soğan İle',
            price: 150,
            imageUrl: 'images/jumbo-sepet.jpg',
            category: 'Sepetler',
            optionCategories: [
              {
                name: 'Kıtır Soğan Seçimi',
                options: [
                  { name: 'Kıtır Soğan istiyorum', priceAdjustment: 0 },
                  { name: 'Kıtır Soğan istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'multi',isMandatory: true,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
        {
            id: 'ts-s-2',
            name: 'Jumbo Filetolu Sepet (XL)',
            description: '300 Gram Jumbo Fileto Patates Kızartması İle, İsteğe Göre Baharat, Soslar ve Kıtır Soğan İle',
            price: 200,
            imageUrl: 'images/jumbo-sepet.jpg',
            category: 'Sepetler',
            optionCategories: [
              {
                name: 'Kıtır Soğan Seçimi',
                options: [
                  { name: 'Kıtır Soğan istiyorum', priceAdjustment: 0 },
                  { name: 'Kıtır Soğan istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'multi',isMandatory: true,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
        {
            id: 'ts-s-3',
            name: 'Nuggetlı Sepet',
            description: '200 Gram Nugget Patates Kızartması İle, İsteğe Göre Baharat, Soslar ve Kıtır Soğan İle',
            price: 100,
            imageUrl: 'images/nugget-sepet.jpg',
            category: 'Sepetler',
            optionCategories: [
              {
                name: 'Kıtır Soğan Seçimi',
                options: [
                  { name: 'Kıtır Soğan istiyorum', priceAdjustment: 0 },
                  { name: 'Kıtır Soğan istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'multi',isMandatory: true,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
        {
            id: 'ts-s-4',
            name: 'Nuggetlı Sepet (XL)',
            description: '300 Gram Nugget Patates Kızartması İle, İsteğe Göre Baharat, Soslar ve Kıtır Soğan İle',
            price: 150,
            imageUrl: 'images/nugget-sepet.jpg',
            category: 'Sepetler',
            optionCategories: [
              {
                name: 'Kıtır Soğan Seçimi',
                options: [
                  { name: 'Kıtır Soğan istiyorum', priceAdjustment: 0 },
                  { name: 'Kıtır Soğan istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'multi',isMandatory: true,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
        {
            id: 'ts-s-5',
            name: 'Piliç Toplu Sepet',
            description: '200 Gram Piliç Topu Patates Kızartması İle, İsteğe Göre Baharat, Soslar ve Kıtır Soğan İle',
            price: 100,
            imageUrl: 'images/top-sepet.jpg',
            category: 'Sepetler',
            optionCategories: [
              {
                name: 'Kıtır Soğan Seçimi',
                options: [
                  { name: 'Kıtır Soğan istiyorum', priceAdjustment: 0 },
                  { name: 'Kıtır Soğan istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'multi',isMandatory: true,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
        {
            id: 'ts-s-6',
            name: 'Piliç Toplu Sepet (XL)',
            description: '300 Gram Piliç Topu Patates Kızartması İle, İsteğe Göre Baharat, Soslar ve Kıtır Soğan İle',
            price: 150,
            imageUrl: 'images/top-sepet.jpg',
            category: 'Sepetler',
            optionCategories: [
              {
                name: 'Kıtır Soğan Seçimi',
                options: [
                  { name: 'Kıtır Soğan istiyorum', priceAdjustment: 0 },
                  { name: 'Kıtır Soğan istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'multi',isMandatory: true,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
        {
            id: 'ts-s-7',
            name: 'Mozzarella Sticks Sepeti',
            description: '200 Gram Mozzarella Sticks Patates Kızartması İle, İsteğe Göre Baharat, Soslar ve Kıtır Soğan İle',
            price: 150,
            imageUrl: 'images/moz-sepet.jpg',
            category: 'Sepetler',
            optionCategories: [
              {
                name: 'Kıtır Soğan Seçimi',
                options: [
                  { name: 'Kıtır Soğan istiyorum', priceAdjustment: 0 },
                  { name: 'Kıtır Soğan istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'multi',isMandatory: true,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
        {
            id: 'ts-k-1',
            name: 'Mozzarella Sticks Sepeti (XL)',
            description: '300 Gram Mozzarella Sticks Patates Kızartması İle, İsteğe Göre Baharat, Soslar ve Kıtır Soğan İle',
            price: 200,
            imageUrl: 'images/moz-sepet.jpg',
            category: 'Sepetler',
            optionCategories: [
              {
                name: 'Kıtır Soğan Seçimi',
                options: [
                  { name: 'Kıtır Soğan istiyorum', priceAdjustment: 0 },
                  { name: 'Kıtır Soğan istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'multi',isMandatory: true,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          }
      ]
        },
        {name: 'Wrapler',
          items: [
            {
              id: 'ts-w-1',
              name: 'Çıtır Wrap',
              description: 'Tortilla Ekmeğinde 200 Gram Jumbo Fileto Wrap,',
              price: 150,
              imageUrl: 'images/citir-wrap.jpg',
              category: 'Wrapler',
              optionCategories: [
                {
                  name: 'Kıtır Soğan Seçimi',
                  options: [
                    { name: 'Kıtır Soğan istiyorum', priceAdjustment: 0 },
                    { name: 'Kıtır Soğan istemiyorum', priceAdjustment: 0 },
                  ],
                  choiceType: 'single',isMandatory: true,
                },
                {
                  name: 'Sos Seçimi',
                  options: [
                    { name: 'Ketçap', priceAdjustment: 0 },
                    { name: 'Mayonez', priceAdjustment: 0 },
                    { name: 'Ranch', priceAdjustment: 0 },
                    { name: 'Barbekü', priceAdjustment: 0 },
                    { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                    { name: 'Hardal', priceAdjustment: 0 },
                    { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                  ],
                  choiceType: 'multi',isMandatory: true,
                },
                {
                  name: 'Malzeme Seçimi',
                  options: [
                    { name: 'Domates', priceAdjustment: 0 },
                    { name: 'Marul', priceAdjustment: 0 },
                    { name: 'Turşu', priceAdjustment: 0 },
                    { name: 'Jalapeno', priceAdjustment: 0 },
                  ],
                  choiceType: 'multi',isMandatory: true,
                },
              ],
            },
          ]
        },
      {
        name: 'İçecekler',
        items: [
           {
            id: 'ts-i-1',
            name: 'Taze Sıkılmış Portakal Suyu',
            description: 'Taptaze, Şişelenmiş Şekilde Servis Edilir',
            price: 75,
            imageUrl: 'images/portakal.jpg',
            category: 'İçecekler'
          },
           {
            id: 'ts-i-2',
            name: 'Pepsi',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/pepsi.jpg',
            category: 'İçecekler'
          },
           {
            id: 'ts-i-3',
            name: 'Pepsi Zero Sugar',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/pepsi-zero.jpg',
            category: 'İçecekler'
          },
           {
            id: 'ts-i-4',
            name: 'Yedigün',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/yedigun.jpg',
            category: 'İçecekler'
          },
           {
            id: 'ts-i-5',
            name: '7Up',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/7up.jpg',
            category: 'İçecekler'
          },
          {
            id: 'ts-i-6',
            name: 'Lipton Ice Tea',
            description: 'Limon - Şeftali - Mango ',
            price: 40,
            imageUrl: 'images/icetea.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Ice Tea Seçimi',
                options: [
                  { name: 'Limon', priceAdjustment: 0 },
                  { name: 'Şeftali', priceAdjustment: 0 },
                  {name: 'Mango', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              
            ],
          },
           {
            id: 'ts-i-7',
            name: 'Tropicana Meyve Suyu',
            description: 'Vişne - Karışık - Şeftali',
            price: 40,
            imageUrl: 'images/tropicana.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Tropicana Seçimi',
                options: [
                  { name: 'Vişne', priceAdjustment: 0 },
                  { name: 'Şeftali', priceAdjustment: 0 },
                  {name: 'Karışık', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
           {
            id: 'ts-i-8',
            name: 'Sek Ayran (28.5 cl)',
            description: 'Eker Ayran Büyük',
            price: 30,
            imageUrl: 'images/ayran.jpg',
            category: 'İçecekler'
          },
           {
            id: 'ts-i-9',
            name: 'Doğanay Gurme Şalgam',
            description: 'Acılı - Acısız',
            price: 20,
            imageUrl: 'images/doganay.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Acı Seçimi',
                options: [
                  { name: 'Acılı', priceAdjustment: 0 },
                  { name: 'Acısız', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
        ]
      }
    ]
  },
  {
    id:'8',
    name:'Annemin Elinden Ev Yemekleri',
    logoUrl: 'logos/annemin-elinden.jpg',
    categories: [
      {
        name: 'Çorbalar',
        items: [
          {
            id: 'ae-c-1',
            name: 'Mercimek Çorbası',
            description: 'Mercimek',
            price: 50,
            imageUrl: 'images/mercimek.jpg',
            category: 'Çorbalar'
          },
          {
            id: 'ae-c-2',
            name: 'Ezogelin',
            description: 'Ezogelin',
            price: 50,
            imageUrl: 'images/ezo.jpg',
            category: 'Çorbalar'
          },
          {
            id: 'ae-c-3',
            name: 'Yayla Çorbası',
            description: 'Yayla Çorbası',
            price: 50,
            imageUrl: 'images/yayla.jpg',
            category: 'Çorbalar'
          }
        ]
      },
      {
        name: 'Sebze Yemekleri',
        items: [
           {
            id: 'ae-s-1',
            name: 'Mücver',
            description: 'Mücver',
            price: 80,
            imageUrl: 'images/mucver.jpg',
            category: 'Sebze Yemekleri'
          },
           {
            id: 'ae-s-2',
            name: 'Bezelye Yemeği',
            description: 'Bezelye Yemeği',
            price: 80,
            imageUrl: 'images/bezelye.jpg',
            category: 'Sebze Yemekleri'
          },
           {
            id: 'ae-s-3',
            name: 'Ispanak Yemeği',
            description: 'Ispanak',
            price: 80,
            imageUrl: 'images/ispanak.jpg',
            category: 'Sebze Yemekleri'
          },
           {
            id: 'ae-s-4',
            name: 'Taze Fasulye',
            description: 'Taze Fasulye',
            price: 80,
            imageUrl: 'images/fasulye.jpg',
            category: 'Sebze Yemekleri'
          },
           {
            id: 'ae-s-5',
            name: 'Biber Dolması',
            description: '2 adet',
            price: 100,
            imageUrl: 'images/biber.jpg',
            category: 'Sebze Yemekleri'
          }
        ]
      },
      {
        name: 'Tavuk Yemekleri',
        items: [
           {
            id: 'ae-t-1',
            name: 'Köri Soslu Tavuk',
            description: '250 Gram Tavuk',
            price: 120,
            imageUrl: 'images/kori.jpg',
            category: 'Tavuk Yemekleri'
          },
           {
            id: 'ae-t-2',
            name: 'Mantarlı Tavuk Sote',
            description: '250 Gram Tavuk',
            price: 120,
            imageUrl: 'images/mantarli.jpg',
            category: 'Tavuk Yemekleri'
          },
           {
            id: 'ae-t-3',
            name: 'Fırın Baget',
            description: '2 adet, sebzelerle servis edilir',
            price: 120,
            imageUrl: 'images/firin.jpg',
            category: 'Tavuk Yemekleri'
          }
        ]
      },
      {
        name: 'Et Yemekleri',
        items: [
          {
            id: 'ae-e-1',
            name: 'Etli Kuru Fasulye',
            description: '300 Gram',
            price: 120,
            imageUrl: 'images/etli-fasulye.jpg',
            category: 'Et Yemekleri'
          },
          {
            id: 'ae-e-2',
            name: 'Etli Nohut Yahni',
            description: '300 Gram',
            price: 120,
            imageUrl: 'images/etli-nohut.jpg',
            category: 'Et Yemekleri'
          },
          {
            id: 'ae-e-3',
            name: 'Kadınbudu Köfte',
            description: '300 Gram',
            price: 120,
            imageUrl: 'images/kadinbudu.jpg',
            category: 'Et Yemekleri'
          },
          {
            id: 'ae-e-4',
            name: 'İzmir Köfte',
            description: '300 Gram',
            price: 120,
            imageUrl: 'images/izmir.jpg',
            category: 'Et Yemekleri'
          },
          {
            id: 'ae-e-5',
            name: 'Patlıcan Musakka',
            description: '300 Gram',
            price: 120,
            imageUrl: 'images/musakka.jpg',
            category: 'Et Yemekleri'
          },
          {
            id: 'ae-e-6',
            name: 'Püreli Et Sote',
            description: '300 Gram',
            price: 120,
            imageUrl: 'images/pureli-et.jpg',
            category: 'Et Yemekleri'
          }
        ]
      },
      {
        name: 'Yanlar',
        items: [
           {
            id: 'ae-y-1',
            name: 'Pirinç Pilavı',
            description: '300 Gram Şehriyesiz Pirinç Pilavı',
            price: 55,
            imageUrl: 'images/pirinc.jpg',
            category: 'Yanlar'
          },
          {
            id: 'ae-y-2',
            name: 'Bulgur Pilavı',
            description: '300 Gram Sebzeli Bulgur Pilavı',
            price: 60,
            imageUrl: 'images/bulgur.jpg',
            category: 'Yanlar'
          },{
            id: 'ae-y-3',
            name: 'Domates Soslu Makarna',
            description: '300 Gram Domates Soslu Kalem Makarna',
            price: 55,
            imageUrl: 'images/domates.jpg',
            category: 'Yanlar'
          },{
            id: 'ae-y-4',
            name: 'Fırın Makarna',
            description: '300 Gram Beşamel Soslu Fırın Makarna',
            price: 70,
            imageUrl: 'images/firin-mak.jpg',
            category: 'Yanlar'
          },
          {
            id: 'ae-y-5',
            name: 'Spaghetti Bolognese',
            description: '300 Gram Kıymalı Bolognese Soslu Spaghetti',
            price: 75,
            imageUrl: 'images/spaghetti.jpg',
            category: 'Yanlar'
          },
        ]
      },
      {
        name: 'İçecekler',
        items: [
           {
            id: 'ae-i-1',
            name: 'Taze Sıkılmış Portakal Suyu',
            description: 'Taptaze, Şişelenmiş Şekilde Servis Edilir',
            price: 75,
            imageUrl: 'images/portakal.jpg',
            category: 'İçecekler'
          },
           {
            id: 'ae-i-2',
            name: 'Pepsi',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/pepsi.jpg',
            category: 'İçecekler'
          },
           {
            id: 'ae-i-3',
            name: 'Pepsi Zero Sugar',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/pepsi-zero.jpg',
            category: 'İçecekler'
          },
           {
            id: 'ae-i-4',
            name: 'Yedigün',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/yedigun.jpg',
            category: 'İçecekler'
          },
           {
            id: 'ae-i-5',
            name: '7Up',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/7up.jpg',
            category: 'İçecekler'
          },
          {
            id: 'ae-i-6',
            name: 'Lipton Ice Tea',
            description: 'Limon - Şeftali - Mango ',
            price: 40,
            imageUrl: 'images/icetea.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Ice Tea Seçimi',
                options: [
                  { name: 'Limon', priceAdjustment: 0 },
                  { name: 'Şeftali', priceAdjustment: 0 },
                  {name: 'Mango', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              
            ],
          },
           {
            id: 'ae-i-7',
            name: 'Tropicana Meyve Suyu',
            description: 'Vişne - Karışık - Şeftali',
            price: 40,
            imageUrl: 'images/tropicana.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Tropicana Seçimi',
                options: [
                  { name: 'Vişne', priceAdjustment: 0 },
                  { name: 'Şeftali', priceAdjustment: 0 },
                  {name: 'Karışık', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
           {
            id: 'ae-i-8',
            name: 'Sek Ayran (28.5 cl)',
            description: 'Eker Ayran Büyük',
            price: 30,
            imageUrl: 'images/ayran.jpg',
            category: 'İçecekler'
          },
           {
            id: 'ae-i-9',
            name: 'Doğanay Gurme Şalgam',
            description: 'Acılı - Acısız',
            price: 20,
            imageUrl: 'images/doganay.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Acı Seçimi',
                options: [
                  { name: 'Acılı', priceAdjustment: 0 },
                  { name: 'Acısız', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
          
        ]
      }
    ]
  },
  {
    id:'9',
    name: 'Fit Wraps',
    logoUrl:'logos/fit-wraps.jpg',
    categories: [
      {
        name: 'Wraps',
        items:[
           {
            id: 'fw-w-1',
            name: 'Falafel Wrap',
            description: 'Malzeme Seçimi (Domates, Salatalık, Marul, Yeşil Biber, Kırmızı Biber,Roka,Maydonoz, Nane, Havuç, Labne +10, Sezar Sos +5',
            price: 100,
            imageUrl: 'images/falafel.jpg',
            category: 'Wraps',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Salatalık', priceAdjustment: 0 },
                  {name: 'Marul', priceAdjustment:0},
                  {name: 'Havuç', priceAdjustment:0},
                  {name: 'Turşu', priceAdjustment:0},
                  {name: 'Jalapeno', priceAdjustment:0},
                  {name: 'Yeşil Biber', priceAdjustment:0},
                  {name: 'Kırmızı Biber', priceAdjustment:0},
                  {name: 'Maydonoz', priceAdjustment:0},
                  {name: 'Nane', priceAdjustment:0},
                  {name: 'Roka', priceAdjustment:0},
                ],
                choiceType: 'multi',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  {name: 'Sos İstemiyorum', priceAdjustment:0},
                  { name: 'Sezar Sos', priceAdjustment: 5 },
                  { name: 'Pesto Sos', priceAdjustment: 5 },                 
                  { name: 'Labne Sos', priceAdjustment: 10 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
           {
            id: 'fw-w-2',
            name: 'Hellim Wrap',
            description: 'Malzeme Seçimi (Domates, Salatalık, Marul, Yeşil Biber, Kırmızı Biber,Roka,Maydonoz, Nane, Havuç, Labne +10, Sezar Sos +5',
            price: 100,
            imageUrl: 'images/hellim.jpg',
            category: 'Wraps',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Salatalık', priceAdjustment: 0 },
                  {name: 'Marul', priceAdjustment:0},
                  {name: 'Havuç', priceAdjustment:0},
                  {name: 'Turşu', priceAdjustment:0},
                  {name: 'Jalapeno', priceAdjustment:0},
                  {name: 'Yeşil Biber', priceAdjustment:0},
                  {name: 'Kırmızı Biber', priceAdjustment:0},
                  {name: 'Maydonoz', priceAdjustment:0},
                  {name: 'Nane', priceAdjustment:0},
                  {name: 'Roka', priceAdjustment:0},
                ],
                choiceType: 'multi',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  {name: 'Sos İstemiyorum', priceAdjustment:0},
                  { name: 'Sezar Sos', priceAdjustment: 5 },
                  { name: 'Pesto Sos', priceAdjustment: 5 },                 
                  { name: 'Labne Sos', priceAdjustment: 10 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
           {
            id: 'fw-w-3',
            name: 'Mozzarella Wrap',
            description: 'Malzeme Seçimi (Domates, Salatalık, Marul, Yeşil Biber, Kırmızı Biber,Roka,Maydonoz, Nane, Havuç, Labne +10, Sezar Sos +5',
            price: 100,
            imageUrl: 'images/moz-wrap.jpg',
            category: 'Wraps',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Salatalık', priceAdjustment: 0 },
                  {name: 'Marul', priceAdjustment:0},
                  {name: 'Havuç', priceAdjustment:0},
                  {name: 'Turşu', priceAdjustment:0},
                  {name: 'Jalapeno', priceAdjustment:0},
                  {name: 'Yeşil Biber', priceAdjustment:0},
                  {name: 'Kırmızı Biber', priceAdjustment:0},
                  {name: 'Maydonoz', priceAdjustment:0},
                  {name: 'Nane', priceAdjustment:0},
                  {name: 'Roka', priceAdjustment:0},
                ],
                choiceType: 'multi',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  {name: 'Sos İstemiyorum', priceAdjustment:0},
                  { name: 'Sezar Sos', priceAdjustment: 5 },
                  { name: 'Pesto Sos', priceAdjustment: 5 },                 
                  { name: 'Labne Sos', priceAdjustment: 10 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          }
        ]
      },
      {
        name: 'İçecekler',
        items: [
           {
            id: 'fw-i-1',
            name: 'Taze Sıkılmış Portakal Suyu',
            description: 'Taptaze, Şişelenmiş Şekilde Servis Edilir',
            price: 75,
            imageUrl: 'images/portakal.jpg',
            category: 'İçecekler'
          },
           {
            id: 'fw-i-2',
            name: 'Pepsi',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/pepsi.jpg',
            category: 'İçecekler'
          },
           {
            id: 'fw-i-3',
            name: 'Pepsi Zero Sugar',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/pepsi-zero.jpg',
            category: 'İçecekler'
          },
           {
            id: 'fw-i-4',
            name: 'Yedigün',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/yedigun.jpg',
            category: 'İçecekler'
          },
           {
            id: 'fw-i-5',
            name: '7Up',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/7up.jpg',
            category: 'İçecekler'
          },
          {
            id: 'fw-i-6',
            name: 'Lipton Ice Tea',
            description: 'Limon - Şeftali - Mango ',
            price: 40,
            imageUrl: 'images/icetea.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Ice Tea Seçimi',
                options: [
                  { name: 'Limon', priceAdjustment: 0 },
                  { name: 'Şeftali', priceAdjustment: 0 },
                  {name: 'Mango', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              
            ],
          },
           {
            id: 'fw-i-7',
            name: 'Tropicana Meyve Suyu',
            description: 'Vişne - Karışık - Şeftali',
            price: 40,
            imageUrl: 'images/tropicana.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Tropicana Seçimi',
                options: [
                  { name: 'Vişne', priceAdjustment: 0 },
                  { name: 'Şeftali', priceAdjustment: 0 },
                  {name: 'Karışık', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
           {
            id: 'fw-i-8',
            name: 'Sek Ayran (28.5 cl)',
            description: 'Eker Ayran Büyük',
            price: 30,
            imageUrl: 'images/ayran.jpg',
            category: 'İçecekler'
          },
           {
            id: 'fw-i-9',
            name: 'Doğanay Gurme Şalgam',
            description: 'Acılı - Acısız',
            price: 20,
            imageUrl: 'images/doganay.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Acı Seçimi',
                options: [
                  { name: 'Acılı', priceAdjustment: 0 },
                  { name: 'Acısız', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
           {
            id: 'fw-i-10',
            name: 'Çay',
            description: 'Çeşitler İçin Personele Danışınız',
            price: 30,
            imageUrl: 'images/cay.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Çay Seçimi',
                options: [
                  { name: 'Earl Grey', priceAdjustment: 0 },
                  { name: 'Black Label', priceAdjustment: 0 },
                  { name: 'Yeşil Çay', priceAdjustment: 0 },
                  { name: 'Kuşburnu', priceAdjustment: 0 },
                  { name: 'Karışık Meyve', priceAdjustment: 0 },
                  { name: 'Detox', priceAdjustment: 0 },
                  { name: 'Kolajen', priceAdjustment: 0 },
                  { name: 'Enerji', priceAdjustment: 0 },
                  { name: 'Şeftali', priceAdjustment: 0 },
                  { name: 'Ananas', priceAdjustment: 0 },
                  { name: 'Mistik', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
        ]
      }
    ]
  },
  {
    id:'10',
    name:'Sandwich Lab',
    logoUrl:'logos/sandwich-lab.jpg',
    categories: [
      {
        name: 'Peynirli Sandviçler',
        items:[
          {
            id: 'sl-p-1',
            name: 'Kaşarlı Sandviç',
            description: '50 gr. Kaşar + Dilediğiniz Malzemeler (Domates, Salatalık, Marul, Havuç, Turşu, Jalapeno, Yeşil Biber, Kırmızı Biber, Nane, Maydonoz, Roka',
            price: 60,
            imageUrl: 'images/sandvic.jpg',
            category: 'Peynirli Sandviçler',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Salatalık', priceAdjustment: 0 },
                  {name: 'Marul', priceAdjustment:0},
                  {name: 'Havuç', priceAdjustment:0},
                  {name: 'Turşu', priceAdjustment:0},
                  {name: 'Jalapeno', priceAdjustment:0},
                  {name: 'Yeşil Biber', priceAdjustment:0},
                  {name: 'Kırmızı Biber', priceAdjustment:0},
                  {name: 'Maydonoz', priceAdjustment:0},
                  {name: 'Nane', priceAdjustment:0},
                  {name: 'Roka', priceAdjustment:0},
                ],
                choiceType: 'multi',isMandatory: true,
              },
            ],
          },
          {
            id: 'sl-p-2',
            name: 'Çeçil Peynirli Sandviç',
            description: '50 gr. Çeçil Peyniri + Dilediğiniz Malzemeler (Domates, Salatalık, Marul, Havuç, Turşu, Jalapeno, Yeşil Biber, Kırmızı Biber, Nane, Maydonoz, Roka',
            price: 60,
            imageUrl: 'images/sandvic.jpg',
            category: 'Peynirli Sandviçler',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Salatalık', priceAdjustment: 0 },
                  {name: 'Marul', priceAdjustment:0},
                  {name: 'Havuç', priceAdjustment:0},
                  {name: 'Turşu', priceAdjustment:0},
                  {name: 'Jalapeno', priceAdjustment:0},
                  {name: 'Yeşil Biber', priceAdjustment:0},
                  {name: 'Kırmızı Biber', priceAdjustment:0},
                  {name: 'Maydonoz', priceAdjustment:0},
                  {name: 'Nane', priceAdjustment:0},
                  {name: 'Roka', priceAdjustment:0},
                ],
                choiceType: 'multi',isMandatory: true,
              },
            ],
          },
          {
            id: 'sl-p-3',
            name: 'Örgü Peynirli Sandviç',
            description: '50 gr. Örgü Peyniri + Dilediğiniz Malzemeler (Domates, Salatalık, Marul, Havuç, Turşu, Jalapeno, Yeşil Biber, Kırmızı Biber, Nane, Maydonoz, Roka',
            price: 60,
            imageUrl: 'images/sandvic.jpg',
            category: 'Peynirli Sandviçler',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Salatalık', priceAdjustment: 0 },
                  {name: 'Marul', priceAdjustment:0},
                  {name: 'Havuç', priceAdjustment:0},
                  {name: 'Turşu', priceAdjustment:0},
                  {name: 'Jalapeno', priceAdjustment:0},
                  {name: 'Yeşil Biber', priceAdjustment:0},
                  {name: 'Kırmızı Biber', priceAdjustment:0},
                  {name: 'Maydonoz', priceAdjustment:0},
                  {name: 'Nane', priceAdjustment:0},
                  {name: 'Roka', priceAdjustment:0},
                ],
                choiceType: 'multi',isMandatory: true,
              },
            ],
          },
          {
            id: 'sl-p-4',
            name: 'Mozzarellalı Sandviç',
            description: '50 gr. Mozzarella + Dilediğiniz Malzemeler (Domates, Salatalık, Marul, Havuç, Turşu, Jalapeno, Yeşil Biber, Kırmızı Biber, Nane, Maydonoz, Roka',
            price: 70,
            imageUrl: 'images/sandvic.jpg',
            category: 'Peynirli Sandviçler',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Salatalık', priceAdjustment: 0 },
                  {name: 'Marul', priceAdjustment:0},
                  {name: 'Havuç', priceAdjustment:0},
                  {name: 'Turşu', priceAdjustment:0},
                  {name: 'Jalapeno', priceAdjustment:0},
                  {name: 'Yeşil Biber', priceAdjustment:0},
                  {name: 'Kırmızı Biber', priceAdjustment:0},
                  {name: 'Maydonoz', priceAdjustment:0},
                  {name: 'Nane', priceAdjustment:0},
                  {name: 'Roka', priceAdjustment:0},
                ],
                choiceType: 'multi',isMandatory: true,
              },
            ],
          },
          {
            id: 'sl-p-5',
            name: 'Cheddarlı Sandviç',
            description: '40 gr. Cheddar + Dilediğiniz Malzemeler (Domates, Salatalık, Marul, Havuç, Turşu, Jalapeno, Yeşil Biber, Kırmızı Biber, Nane, Maydonoz, Roka',
            price: 75,
            imageUrl: 'images/sandvic.jpg',
            category: 'Peynirli Sandviçler',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Salatalık', priceAdjustment: 0 },
                  {name: 'Marul', priceAdjustment:0},
                  {name: 'Havuç', priceAdjustment:0},
                  {name: 'Turşu', priceAdjustment:0},
                  {name: 'Jalapeno', priceAdjustment:0},
                  {name: 'Yeşil Biber', priceAdjustment:0},
                  {name: 'Kırmızı Biber', priceAdjustment:0},
                  {name: 'Maydonoz', priceAdjustment:0},
                  {name: 'Nane', priceAdjustment:0},
                  {name: 'Roka', priceAdjustment:0},
                ],
                choiceType: 'multi',isMandatory: true,
              },
            ],
          },
          {
            id: 'sl-p-6',
            name: '3 Peynirli Sandviç',
            description: '20 gr. Kaşar, 20 gr. Cheddar, Labne + Dilediğiniz Malzemeler (Domates, Salatalık, Marul, Havuç, Turşu, Jalapeno, Yeşil Biber, Kırmızı Biber, Nane, Maydonoz, Roka',
            price: 75,
            imageUrl: 'images/sandvic.jpg',
            category: 'Peynirli Sandviçler',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Salatalık', priceAdjustment: 0 },
                  {name: 'Marul', priceAdjustment:0},
                  {name: 'Havuç', priceAdjustment:0},
                  {name: 'Turşu', priceAdjustment:0},
                  {name: 'Jalapeno', priceAdjustment:0},
                  {name: 'Yeşil Biber', priceAdjustment:0},
                  {name: 'Kırmızı Biber', priceAdjustment:0},
                  {name: 'Maydonoz', priceAdjustment:0},
                  {name: 'Nane', priceAdjustment:0},
                  {name: 'Roka', priceAdjustment:0},
                ],
                choiceType: 'multi',isMandatory: true,
              },
            ],
          },
          {
            id: 'sl-p-7',
            name: 'Yerel 3 Peynirli Sandviç',
            description: '20 gr. Kaşar, 20gr. Eski Kaşar, 20gr. Ezine Peyniri + Dilediğiniz Malzemeler (Domates, Salatalık, Marul, Havuç, Turşu, Jalapeno, Yeşil Biber, Kırmızı Biber, Nane, Maydonoz, Roka',
            price: 80,
            imageUrl: 'images/sandvic.jpg',
            category: 'Peynirli Sandviçler',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Salatalık', priceAdjustment: 0 },
                  {name: 'Marul', priceAdjustment:0},
                  {name: 'Havuç', priceAdjustment:0},
                  {name: 'Turşu', priceAdjustment:0},
                  {name: 'Jalapeno', priceAdjustment:0},
                  {name: 'Yeşil Biber', priceAdjustment:0},
                  {name: 'Kırmızı Biber', priceAdjustment:0},
                  {name: 'Maydonoz', priceAdjustment:0},
                  {name: 'Nane', priceAdjustment:0},
                  {name: 'Roka', priceAdjustment:0},
                ],
                choiceType: 'multi',isMandatory: true,
              },
            ],
          },
          {
            id: 'sl-p-8',
            name: 'Eski Kaşarlı Sandviç',
            description: '50 gr. Eski Kaşar + Dilediğiniz Malzemeler (Domates, Salatalık, Marul, Havuç, Turşu, Jalapeno, Yeşil Biber, Kırmızı Biber, Nane, Maydonoz, Roka',
            price: 80,
            imageUrl: 'images/sandvic.jpg',
            category: 'Peynirli Sandviçler',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Salatalık', priceAdjustment: 0 },
                  {name: 'Marul', priceAdjustment:0},
                  {name: 'Havuç', priceAdjustment:0},
                  {name: 'Turşu', priceAdjustment:0},
                  {name: 'Jalapeno', priceAdjustment:0},
                  {name: 'Yeşil Biber', priceAdjustment:0},
                  {name: 'Kırmızı Biber', priceAdjustment:0},
                  {name: 'Maydonoz', priceAdjustment:0},
                  {name: 'Nane', priceAdjustment:0},
                  {name: 'Roka', priceAdjustment:0},
                ],
                choiceType: 'multi',isMandatory: true,
              },
            ],
          }
        ]
      },
      {
        name: 'Piliç Şarküteri',
        items:[
          {
          id: 'sl-ps-1',
            name: 'Tavuk Salamlı Sandviç',
            description: '50 gr. Kaşar, 50 gr. Tavuk Salam + Dilediğiniz Malzemeler (Domates, Salatalık, Marul, Havuç, Turşu, Jalapeno, Yeşil Biber, Kırmızı Biber, Nane, Maydonoz, Roka',
            price: 90,
            imageUrl: 'images/sandvic.jpg',
            category: 'Piliç Şarküteri',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Salatalık', priceAdjustment: 0 },
                  {name: 'Marul', priceAdjustment:0},
                  {name: 'Havuç', priceAdjustment:0},
                  {name: 'Turşu', priceAdjustment:0},
                  {name: 'Jalapeno', priceAdjustment:0},
                  {name: 'Yeşil Biber', priceAdjustment:0},
                  {name: 'Kırmızı Biber', priceAdjustment:0},
                  {name: 'Maydonoz', priceAdjustment:0},
                  {name: 'Nane', priceAdjustment:0},
                  {name: 'Roka', priceAdjustment:0},
                ],
                choiceType: 'multi',isMandatory: true,
              },
            ],
          },
          {
            id: 'sl-ps-2',
            name: 'Tavuk Jambonlu (Beyaz) Sandviç',
            description: '50 gr. Kaşar, 50 gr. Tavuk Jambon + Dilediğiniz Malzemeler (Domates, Salatalık, Marul, Havuç, Turşu, Jalapeno, Yeşil Biber, Kırmızı Biber, Nane, Maydonoz, Roka',
            price: 90,
            imageUrl: 'images/sandvic.jpg',
            category: 'Piliç Şarküteri',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Salatalık', priceAdjustment: 0 },
                  {name: 'Marul', priceAdjustment:0},
                  {name: 'Havuç', priceAdjustment:0},
                  {name: 'Turşu', priceAdjustment:0},
                  {name: 'Jalapeno', priceAdjustment:0},
                  {name: 'Yeşil Biber', priceAdjustment:0},
                  {name: 'Kırmızı Biber', priceAdjustment:0},
                  {name: 'Maydonoz', priceAdjustment:0},
                  {name: 'Nane', priceAdjustment:0},
                  {name: 'Roka', priceAdjustment:0},
                ],
                choiceType: 'multi',isMandatory: true,
              },
            ],
          }
        ]
      },
      {
        name: 'Hindi Şarküteri',
        items:[
          {
          id: 'sl-hs-1',
            name: 'Hindi Salamlı Sandviç',
            description: '50 gr. Kaşar, 50 gr. Hindi Salam + Dilediğiniz Malzemeler (Domates, Salatalık, Marul, Havuç, Turşu, Jalapeno, Yeşil Biber, Kırmızı Biber, Nane, Maydonoz, Roka',
            price: 100,
            imageUrl: 'images/sandvic.jpg',
            category: 'Hindi Şarküteri',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Salatalık', priceAdjustment: 0 },
                  {name: 'Marul', priceAdjustment:0},
                  {name: 'Havuç', priceAdjustment:0},
                  {name: 'Turşu', priceAdjustment:0},
                  {name: 'Jalapeno', priceAdjustment:0},
                  {name: 'Yeşil Biber', priceAdjustment:0},
                  {name: 'Kırmızı Biber', priceAdjustment:0},
                  {name: 'Maydonoz', priceAdjustment:0},
                  {name: 'Nane', priceAdjustment:0},
                  {name: 'Roka', priceAdjustment:0},
                ],
                choiceType: 'multi',isMandatory: true,
              },
            ],
          },
          {
          id: 'sl-hs-2',
            name: 'Hindi Jambonlu Sandviç',
            description: '50 gr. Kaşar, 50 gr. Hindi Jambon + Dilediğiniz Malzemeler (Domates, Salatalık, Marul, Havuç, Turşu, Jalapeno, Yeşil Biber, Kırmızı Biber, Nane, Maydonoz, Roka',
            price: 100,
            imageUrl: 'images/sandvic.jpg',
            category: 'Hindi Şarküteri',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Salatalık', priceAdjustment: 0 },
                  {name: 'Marul', priceAdjustment:0},
                  {name: 'Havuç', priceAdjustment:0},
                  {name: 'Turşu', priceAdjustment:0},
                  {name: 'Jalapeno', priceAdjustment:0},
                  {name: 'Yeşil Biber', priceAdjustment:0},
                  {name: 'Kırmızı Biber', priceAdjustment:0},
                  {name: 'Maydonoz', priceAdjustment:0},
                  {name: 'Nane', priceAdjustment:0},
                  {name: 'Roka', priceAdjustment:0},
                ],
                choiceType: 'multi',isMandatory: true,
              },
            ],
          },
          {
          id: 'sl-hs-3',
            name: 'Hindi Fümeli Sandviç',
            description: '50 gr. Kaşar, 50 gr. Hindi Füme + Dilediğiniz Malzemeler (Domates, Salatalık, Marul, Havuç, Turşu, Jalapeno, Yeşil Biber, Kırmızı Biber, Nane, Maydonoz, Roka',
            price: 120,
            imageUrl: 'images/sandvic.jpg',
            category: 'Hindi Şarküteri',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Salatalık', priceAdjustment: 0 },
                  {name: 'Marul', priceAdjustment:0},
                  {name: 'Havuç', priceAdjustment:0},
                  {name: 'Turşu', priceAdjustment:0},
                  {name: 'Jalapeno', priceAdjustment:0},
                  {name: 'Yeşil Biber', priceAdjustment:0},
                  {name: 'Kırmızı Biber', priceAdjustment:0},
                  {name: 'Maydonoz', priceAdjustment:0},
                  {name: 'Nane', priceAdjustment:0},
                  {name: 'Roka', priceAdjustment:0},
                ],
                choiceType: 'multi',isMandatory: true,
              },
            ],
          }
        ]
      },
      {
        name:'Dana Şarküteri',
        items:[
          {
          id: 'sl-ds-1',
            name: 'Dana Salamlı Sandviç',
            description: '50 gr. Kaşar, 50 gr. Dana Salam + Dilediğiniz Malzemeler (Domates, Salatalık, Marul, Havuç, Turşu, Jalapeno, Yeşil Biber, Kırmızı Biber, Nane, Maydonoz, Roka',
            price: 120,
            imageUrl: 'images/sandvic.jpg',
            category: 'Dana Şarküteri',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Salatalık', priceAdjustment: 0 },
                  {name: 'Marul', priceAdjustment:0},
                  {name: 'Havuç', priceAdjustment:0},
                  {name: 'Turşu', priceAdjustment:0},
                  {name: 'Jalapeno', priceAdjustment:0},
                  {name: 'Yeşil Biber', priceAdjustment:0},
                  {name: 'Kırmızı Biber', priceAdjustment:0},
                  {name: 'Maydonoz', priceAdjustment:0},
                  {name: 'Nane', priceAdjustment:0},
                  {name: 'Roka', priceAdjustment:0},
                ],
                choiceType: 'multi',isMandatory: true,
              },
            ],
          },
           {
          id: 'sl-ds-2',
            name: 'Dana Jambonlu Sandviç',
            description: '50 gr. Kaşar, 50 gr. Dana Jambon + Dilediğiniz Malzemeler (Domates, Salatalık, Marul, Havuç, Turşu, Jalapeno, Yeşil Biber, Kırmızı Biber, Nane, Maydonoz, Roka',
            price: 120,
            imageUrl: 'images/sandvic.jpg',
            category: 'Dana Şarküteri',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Salatalık', priceAdjustment: 0 },
                  {name: 'Marul', priceAdjustment:0},
                  {name: 'Havuç', priceAdjustment:0},
                  {name: 'Turşu', priceAdjustment:0},
                  {name: 'Jalapeno', priceAdjustment:0},
                  {name: 'Yeşil Biber', priceAdjustment:0},
                  {name: 'Kırmızı Biber', priceAdjustment:0},
                  {name: 'Maydonoz', priceAdjustment:0},
                  {name: 'Nane', priceAdjustment:0},
                  {name: 'Roka', priceAdjustment:0},
                ],
                choiceType: 'multi',isMandatory: true,
              },
            ],
          },
           {
          id: 'sl-ds-3',
            name: 'Dana Baconlu Sandviç',
            description: '50 gr. Kaşar, 50 gr. Dana Bacon + Dilediğiniz Malzemeler (Domates, Salatalık, Marul, Havuç, Turşu, Jalapeno, Yeşil Biber, Kırmızı Biber, Nane, Maydonoz, Roka',
            price: 150,
            imageUrl: 'images/sandvic.jpg',
            category: 'Dana Şarküteri',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Salatalık', priceAdjustment: 0 },
                  {name: 'Marul', priceAdjustment:0},
                  {name: 'Havuç', priceAdjustment:0},
                  {name: 'Turşu', priceAdjustment:0},
                  {name: 'Jalapeno', priceAdjustment:0},
                  {name: 'Yeşil Biber', priceAdjustment:0},
                  {name: 'Kırmızı Biber', priceAdjustment:0},
                  {name: 'Maydonoz', priceAdjustment:0},
                  {name: 'Nane', priceAdjustment:0},
                  {name: 'Roka', priceAdjustment:0},
                ],
                choiceType: 'multi',isMandatory: true,
              },
            ],
          },
           {
          id: 'sl-ds-4',
            name: 'Füme Roastbeefli Sandviç',
            description: '50 gr. Kaşar, 50 gr. Füme Roastbeef + Dilediğiniz Malzemeler (Domates, Salatalık, Marul, Havuç, Turşu, Jalapeno, Yeşil Biber, Kırmızı Biber, Nane, Maydonoz, Roka',
            price: 150,
            imageUrl: 'images/sandvic.jpg',
            category: 'Dana Şarküteri',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Salatalık', priceAdjustment: 0 },
                  {name: 'Marul', priceAdjustment:0},
                  {name: 'Havuç', priceAdjustment:0},
                  {name: 'Turşu', priceAdjustment:0},
                  {name: 'Jalapeno', priceAdjustment:0},
                  {name: 'Yeşil Biber', priceAdjustment:0},
                  {name: 'Kırmızı Biber', priceAdjustment:0},
                  {name: 'Maydonoz', priceAdjustment:0},
                  {name: 'Nane', priceAdjustment:0},
                  {name: 'Roka', priceAdjustment:0},
                ],
                choiceType: 'multi',isMandatory: true,
              },
            ],
          },
        ]
      },
      {
        name: 'İçecekler',
        items: [
           {
            id: 'sl-i-1',
            name: 'Taze Sıkılmış Portakal Suyu',
            description: 'Taptaze, Şişelenmiş Şekilde Servis Edilir',
            price: 75,
            imageUrl: 'images/portakal.jpg',
            category: 'İçecekler'
          },
           {
            id: 'sl-i-2',
            name: 'Pepsi',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/pepsi.jpg',
            category: 'İçecekler'
          },
           {
            id: 'sl-i-3',
            name: 'Pepsi Zero Sugar',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/pepsi-zero.jpg',
            category: 'İçecekler'
          },
           {
            id: 'sl-i-4',
            name: 'Yedigün',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/yedigun.jpg',
            category: 'İçecekler'
          },
           {
            id: 'sl-i-5',
            name: '7Up',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/7up.jpg',
            category: 'İçecekler'
          },
          {
            id: 'sl-i-6',
            name: 'Lipton Ice Tea',
            description: 'Limon - Şeftali - Mango ',
            price: 40,
            imageUrl: 'images/icetea.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Ice Tea Seçimi',
                options: [
                  { name: 'Limon', priceAdjustment: 0 },
                  { name: 'Şeftali', priceAdjustment: 0 },
                  {name: 'Mango', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              
            ],
          },
           {
            id: 'sl-i-7',
            name: 'Tropicana Meyve Suyu',
            description: 'Vişne - Karışık - Şeftali',
            price: 40,
            imageUrl: 'images/tropicana.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Tropicana Seçimi',
                options: [
                  { name: 'Vişne', priceAdjustment: 0 },
                  { name: 'Şeftali', priceAdjustment: 0 },
                  {name: 'Karışık', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
           {
            id: 'sl-i-8',
            name: 'Sek Ayran (28.5 cl)',
            description: 'Eker Ayran Büyük',
            price: 30,
            imageUrl: 'images/ayran.jpg',
            category: 'İçecekler'
          },
           {
            id: 'sl-i-9',
            name: 'Doğanay Gurme Şalgam',
            description: 'Acılı - Acısız',
            price: 20,
            imageUrl: 'images/doganay.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Acı Seçimi',
                options: [
                  { name: 'Acılı', priceAdjustment: 0 },
                  { name: 'Acısız', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
           {
            id: 'sl-i-10',
            name: 'Çay',
            description: 'Çeşitler İçin Personele Danışınız',
            price: 30,
            imageUrl: 'images/cay.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Çay Seçimi',
                options: [
                  { name: 'Earl Grey', priceAdjustment: 0 },
                  { name: 'Black Label', priceAdjustment: 0 },
                  { name: 'Yeşil Çay', priceAdjustment: 0 },
                  { name: 'Kuşburnu', priceAdjustment: 0 },
                  { name: 'Karışık Meyve', priceAdjustment: 0 },
                  { name: 'Detox', priceAdjustment: 0 },
                  { name: 'Kolajen', priceAdjustment: 0 },
                  { name: 'Enerji', priceAdjustment: 0 },
                  { name: 'Şeftali', priceAdjustment: 0 },
                  { name: 'Ananas', priceAdjustment: 0 },
                  { name: 'Mistik', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
        ]
      }
    ]
  },
  {
    id:'11',
    name:'Smaaash Burger',
    logoUrl:'logos/smash-burger.jpg',
    categories:[
      {
        name:'Burgerler',
        items:[
          {
            id: 'sb-b-1',
            name: 'Smaaash Burger',
            description: 'Brioche Ekmeğinde 100 gr. Dana Smaaash Burger',
            price: 150,
            imageUrl: 'images/burger.jpg',
            category: 'Burgerler',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Karamelize Soğan', priceAdjustment: 0 },
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Marul', priceAdjustment: 0 },
                  { name: 'Turşu', priceAdjustment: 0 },
                ],
                choiceType: 'multi',isMandatory: false,
              },
              {
                name: 'Turşu Seçimi',
                options: [
                  { name: 'Turşu istiyorum', priceAdjustment: 0 },
                  { name: 'Turşu istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: false,
              },
            ],
          },
          {
            id: 'sb-b-2',
            name: 'Cheese Smaaash Burger',
            description: 'Brioche Ekmeğinde 100 gr. Dana Smaaash Burger, Cheddar Peyniri',
            price: 170,
            imageUrl: 'images/burger.jpg',
            category: 'Burgerler',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Karamelize Soğan', priceAdjustment: 0 },
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Marul', priceAdjustment: 0 },
                  { name: 'Turşu', priceAdjustment: 0 },
                ],
                choiceType: 'multi',isMandatory: false,
              },
              {
                name: 'Turşu Seçimi',
                options: [
                  { name: 'Turşu istiyorum', priceAdjustment: 0 },
                  { name: 'Turşu istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: false,
              },
            ],
          },
          {
            id: 'sb-b-3',
            name: 'Smaaash Bacon Burger',
            description: 'Brioche Ekmeğinde Dana Baconlu 100 gr. Dana Smaaash Burger',
            price: 175,
            imageUrl: 'images/burger.jpg',
            category: 'Burgerler',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Karamelize Soğan', priceAdjustment: 0 },
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Marul', priceAdjustment: 0 },
                  { name: 'Turşu', priceAdjustment: 0 },
                ],
                choiceType: 'multi',isMandatory: false,
              },
              {
                name: 'Turşu Seçimi',
                options: [
                  { name: 'Turşu istiyorum', priceAdjustment: 0 },
                  { name: 'Turşu istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: false,
              },
            ],
          },
          {
            id: 'sb-b-4',
            name: 'Double Smaaash Burger',
            description: 'Brioche Ekmeğinde 2 adet 100 gr. Dana Smaaash Burger Köftesi',
            price: 200,
            imageUrl: 'images/burger.jpg',
            category: 'Burgerler',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Karamelize Soğan', priceAdjustment: 0 },
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Marul', priceAdjustment: 0 },
                  { name: 'Turşu', priceAdjustment: 0 },
                ],
                choiceType: 'multi',isMandatory: false,
              },
              {
                name: 'Turşu Seçimi',
                options: [
                  { name: 'Turşu istiyorum', priceAdjustment: 0 },
                  { name: 'Turşu istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: false,
              },
            ],
          },
          {
            id: 'sb-b-5',
            name: 'Double Cheese Smaaash Burger',
            description: 'Brioche Ekmeğinde 2 adet 100 gr. Dana Smaaash Burger Köftesi, Cheddar Peyniri İle',
            price: 220,
            imageUrl: 'images/burger.jpg',
            category: 'Burgerler',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Karamelize Soğan', priceAdjustment: 0 },
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Marul', priceAdjustment: 0 },
                  { name: 'Turşu', priceAdjustment: 0 },
                ],
                choiceType: 'multi',isMandatory: false,
              },
              {
                name: 'Turşu Seçimi',
                options: [
                  { name: 'Turşu istiyorum', priceAdjustment: 0 },
                  { name: 'Turşu istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: false,
              },
            ],
          },
          {
            id: 'sb-b-6',
            name: 'Double Smaaash Bacon Burger',
            description: 'Brioche Ekmeğinde 2 adet 100 gr. Dana Smaaash Burger Köftesi, Dana Bacon',
            price: 225,
            imageUrl: 'images/burger.jpg',
            category: 'Burgerler',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Karamelize Soğan', priceAdjustment: 0 },
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Marul', priceAdjustment: 0 },
                  { name: 'Turşu', priceAdjustment: 0 },
                ],
                choiceType: 'multi',isMandatory: false,
              },
              {
                name: 'Turşu Seçimi',
                options: [
                  { name: 'Turşu istiyorum', priceAdjustment: 0 },
                  { name: 'Turşu istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: false,
              },
            ],
          },
          {
            id: 'sb-b-7',
            name: 'King Smaaash Burger',
            description: 'Brioche Ekmeğinde 3 adet 100 gr. Dana Smaaash Burger Köftesi, Dana Bacon, Cheddar Peyniri İle',
            price: 300,
            imageUrl: 'images/burger.jpg',
            category: 'Burgerler',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Karamelize Soğan', priceAdjustment: 0 },
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Marul', priceAdjustment: 0 },
                  { name: 'Turşu', priceAdjustment: 0 },
                ],
                choiceType: 'multi',isMandatory: false,
              },
              {
                name: 'Turşu Seçimi',
                options: [
                  { name: 'Turşu istiyorum', priceAdjustment: 0 },
                  { name: 'Turşu istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: false,
              },
            ],
          },
          {
            id: 'sb-b-8',
            name: 'Fried Chicken Burger',
            description: 'Brioche Ekmeğinde 150 gr. Tavuk Filetolu Burger',
            price: 100,
            imageUrl: 'images/burger.jpg',
            category: 'Burgerler',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Karamelize Soğan', priceAdjustment: 0 },
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Marul', priceAdjustment: 0 },
                  { name: 'Turşu', priceAdjustment: 0 },
                ],
                choiceType: 'multi',isMandatory: false,
              },
              {
                name: 'Turşu Seçimi',
                options: [
                  { name: 'Turşu istiyorum', priceAdjustment: 0 },
                  { name: 'Turşu istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: false,
              },
            ],
          }
        ]
      },
      {
        name:'Menüler',
        items:[
          {
            id: 'sb-m-1',
            name: 'Smaaash Burger Menü',
            description: 'Smaaash Burger + Patates Kızartması + Dilediğiniz Kutu İçecek',
            price: 210,
            imageUrl: 'images/burger-menu.jpg',
            category: 'Menüler',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Karamelize Soğan', priceAdjustment: 0 },
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Marul', priceAdjustment: 0 },
                  { name: 'Turşu', priceAdjustment: 0 },
                ],
                choiceType: 'multi',isMandatory: false,
              },
              {
                name: 'Turşu Seçimi',
                options: [
                  { name: 'Turşu istiyorum', priceAdjustment: 0 },
                  { name: 'Turşu istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: false,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'İçecek Seçimi',
                options:[
                  {name: 'Ayran', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acılı', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acısız', priceAdjustment:0},
                  {name: 'Pepsi', priceAdjustment: 10},
                  {name: 'Pepsi-Zero', priceAdjustment:10},
                  {name: 'Yedigün', priceAdjustment:10},
                  {name: '7Up', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Şeftali', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Limon', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Mango', priceAdjustment:10},
                  {name: 'Tropicana Karışık', priceAdjustment:10},
                  {name: 'Tropicana Vişne', priceAdjustment:10},
                  {name: 'Tropicana Şeftali', priceAdjustment:10},
                  {name: 'Taze Sıkılmış Portakal Suyu', priceAdjustment:40},
                ],
                choiceType:'single', isMandatory:true,
              }
            ],
              
              
              
          },
          {
            id: 'sb-m-2',
            name: 'Cheese Smaaash Burger Menü',
            description: 'Cheese Smaaash Burger + Patates Kızartması + Dilediğiniz Kutu İçecek',
            price: 230,
            imageUrl: 'images/burger-menu.jpg',
            category: 'Menüler',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Karamelize Soğan', priceAdjustment: 0 },
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Marul', priceAdjustment: 0 },
                  { name: 'Turşu', priceAdjustment: 0 },
                ],
                choiceType: 'multi',isMandatory: false,
              },
              {
                name: 'Turşu Seçimi',
                options: [
                  { name: 'Turşu istiyorum', priceAdjustment: 0 },
                  { name: 'Turşu istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: false,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'İçecek Seçimi',
                options:[
                  {name: 'Ayran', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acılı', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acısız', priceAdjustment:0},
                  {name: 'Pepsi', priceAdjustment: 10},
                  {name: 'Pepsi-Zero', priceAdjustment:10},
                  {name: 'Yedigün', priceAdjustment:10},
                  {name: '7Up', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Şeftali', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Limon', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Mango', priceAdjustment:10},
                  {name: 'Tropicana Karışık', priceAdjustment:10},
                  {name: 'Tropicana Vişne', priceAdjustment:10},
                  {name: 'Tropicana Şeftali', priceAdjustment:10},
                  {name: 'Taze Sıkılmış Portakal Suyu', priceAdjustment:40},
                ],
                choiceType:'single', isMandatory:true,
              }
            ],
          },
          {
            id: 'sb-m-3',
            name: 'Smaaash Bacon Burger Menü',
            description: 'Smaaash Bacon Burger + Patates Kızartması + Dilediğiniz Kutu İçecek',
            price: 235,
            imageUrl: 'images/burger-menu.jpg',
            category: 'Menüler',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Karamelize Soğan', priceAdjustment: 0 },
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Marul', priceAdjustment: 0 },
                  { name: 'Turşu', priceAdjustment: 0 },
                ],
                choiceType: 'multi',isMandatory: false,
              },
              {
                name: 'Turşu Seçimi',
                options: [
                  { name: 'Turşu istiyorum', priceAdjustment: 0 },
                  { name: 'Turşu istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: false,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'İçecek Seçimi',
                options:[
                  {name: 'Ayran', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acılı', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acısız', priceAdjustment:0},
                  {name: 'Pepsi', priceAdjustment: 10},
                  {name: 'Pepsi-Zero', priceAdjustment:10},
                  {name: 'Yedigün', priceAdjustment:10},
                  {name: '7Up', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Şeftali', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Limon', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Mango', priceAdjustment:10},
                  {name: 'Tropicana Karışık', priceAdjustment:10},
                  {name: 'Tropicana Vişne', priceAdjustment:10},
                  {name: 'Tropicana Şeftali', priceAdjustment:10},
                  {name: 'Taze Sıkılmış Portakal Suyu', priceAdjustment:40},
                ],
                choiceType:'single', isMandatory:true,
              }
            ],
          },
          {
            id: 'sb-m-4',
            name: 'Double Smaaash Burger Menü',
            description: 'Double Smaaash Burger + Patates Kızartması + Dilediğiniz Kutu İçecek',
            price: 260,
            imageUrl: 'images/burger-menu.jpg',
            category: 'Menüler',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Karamelize Soğan', priceAdjustment: 0 },
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Marul', priceAdjustment: 0 },
                  { name: 'Turşu', priceAdjustment: 0 },
                ],
                choiceType: 'multi',isMandatory: false,
              },
              {
                name: 'Turşu Seçimi',
                options: [
                  { name: 'Turşu istiyorum', priceAdjustment: 0 },
                  { name: 'Turşu istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: false,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'İçecek Seçimi',
                options:[
                  {name: 'Ayran', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acılı', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acısız', priceAdjustment:0},
                  {name: 'Pepsi', priceAdjustment: 10},
                  {name: 'Pepsi-Zero', priceAdjustment:10},
                  {name: 'Yedigün', priceAdjustment:10},
                  {name: '7Up', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Şeftali', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Limon', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Mango', priceAdjustment:10},
                  {name: 'Tropicana Karışık', priceAdjustment:10},
                  {name: 'Tropicana Vişne', priceAdjustment:10},
                  {name: 'Tropicana Şeftali', priceAdjustment:10},
                  {name: 'Taze Sıkılmış Portakal Suyu', priceAdjustment:40},
                ],
                choiceType:'single', isMandatory:true,
              }
            ],
          },
          {
            id: 'sb-m-5',
            name: 'Double Cheese Smaaash Burger Menü',
            description: 'Double Cheese Smaaash Burger + Patates Kızartması + Dilediğiniz Kutu İçecek',
            price: 280,
            imageUrl: 'images/burger-menu.jpg',
            category: 'Menüler',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Karamelize Soğan', priceAdjustment: 0 },
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Marul', priceAdjustment: 0 },
                  { name: 'Turşu', priceAdjustment: 0 },
                ],
                choiceType: 'multi',isMandatory: false,
              },
              {
                name: 'Turşu Seçimi',
                options: [
                  { name: 'Turşu istiyorum', priceAdjustment: 0 },
                  { name: 'Turşu istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: false,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'İçecek Seçimi',
                options:[
                  {name: 'Ayran', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acılı', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acısız', priceAdjustment:0},
                  {name: 'Pepsi', priceAdjustment: 10},
                  {name: 'Pepsi-Zero', priceAdjustment:10},
                  {name: 'Yedigün', priceAdjustment:10},
                  {name: '7Up', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Şeftali', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Limon', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Mango', priceAdjustment:10},
                  {name: 'Tropicana Karışık', priceAdjustment:10},
                  {name: 'Tropicana Vişne', priceAdjustment:10},
                  {name: 'Tropicana Şeftali', priceAdjustment:10},
                  {name: 'Taze Sıkılmış Portakal Suyu', priceAdjustment:40},
                ],
                choiceType:'single', isMandatory:true,
              }
            ],
          },
          {
            id: 'sb-m-6',
            name: 'Double Smaaash Bacon Burger Menü',
            description: 'Double Smaaash Bacon Burger + Patates Kızartması + Dilediğiniz Kutu İçecek',
            price: 285,
            imageUrl: 'images/burger-menu.jpg',
            category: 'Menüler',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Karamelize Soğan', priceAdjustment: 0 },
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Marul', priceAdjustment: 0 },
                  { name: 'Turşu', priceAdjustment: 0 },
                ],
                choiceType: 'multi',isMandatory: false,
              },
              {
                name: 'Turşu Seçimi',
                options: [
                  { name: 'Turşu istiyorum', priceAdjustment: 0 },
                  { name: 'Turşu istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: false,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'İçecek Seçimi',
                options:[
                  {name: 'Ayran', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acılı', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acısız', priceAdjustment:0},
                  {name: 'Pepsi', priceAdjustment: 10},
                  {name: 'Pepsi-Zero', priceAdjustment:10},
                  {name: 'Yedigün', priceAdjustment:10},
                  {name: '7Up', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Şeftali', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Limon', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Mango', priceAdjustment:10},
                  {name: 'Tropicana Karışık', priceAdjustment:10},
                  {name: 'Tropicana Vişne', priceAdjustment:10},
                  {name: 'Tropicana Şeftali', priceAdjustment:10},
                  {name: 'Taze Sıkılmış Portakal Suyu', priceAdjustment:40},
                ],
                choiceType:'single', isMandatory:true,
              }
            ],
          },
          {
            id: 'sb-m-7',
            name: 'King Smaaash Burger Menü',
            description: 'King Smaaash Burger + Patates Kızartması + Dilediğiniz Kutu İçecek',
            price: 360,
            imageUrl: 'images/burger-menu.jpg',
            category: 'Menüler',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Karamelize Soğan', priceAdjustment: 0 },
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Marul', priceAdjustment: 0 },
                  { name: 'Turşu', priceAdjustment: 0 },
                ],
                choiceType: 'multi',isMandatory: false,
              },
              {
                name: 'Turşu Seçimi',
                options: [
                  { name: 'Turşu istiyorum', priceAdjustment: 0 },
                  { name: 'Turşu istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: false,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'İçecek Seçimi',
                options:[
                  {name: 'Ayran', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acılı', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acısız', priceAdjustment:0},
                  {name: 'Pepsi', priceAdjustment: 10},
                  {name: 'Pepsi-Zero', priceAdjustment:10},
                  {name: 'Yedigün', priceAdjustment:10},
                  {name: '7Up', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Şeftali', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Limon', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Mango', priceAdjustment:10},
                  {name: 'Tropicana Karışık', priceAdjustment:10},
                  {name: 'Tropicana Vişne', priceAdjustment:10},
                  {name: 'Tropicana Şeftali', priceAdjustment:10},
                  {name: 'Taze Sıkılmış Portakal Suyu', priceAdjustment:40},
                ],
                choiceType:'single', isMandatory:true,
              }
            ],
          },
          {
            id: 'sb-m-8',
            name: 'Fried Chicken Burger Menü',
            description: 'Fried Chicken Burger + Patates Kızartması + Dilediğiniz Kutu İçecek',
            price: 160,
            imageUrl: 'images/burger-menu.jpg',
            category: 'Menüler',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Karamelize Soğan', priceAdjustment: 0 },
                  { name: 'Domates', priceAdjustment: 0 },
                  { name: 'Marul', priceAdjustment: 0 },
                  { name: 'Turşu', priceAdjustment: 0 },
                ],
                choiceType: 'multi',isMandatory: false,
              },
              {
                name: 'Turşu Seçimi',
                options: [
                  { name: 'Turşu istiyorum', priceAdjustment: 0 },
                  { name: 'Turşu istemiyorum', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: false,
              },
              {
                name: 'Patates Baharatı Seçimi',
                options: [
                  {name: 'Baharatlı', priceAdjustment:0},
                  {name: 'Baharatsız', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'İçecek Seçimi',
                options:[
                  {name: 'Ayran', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acılı', priceAdjustment: 0},
                  {name: 'Doğanay Gurme Şalgam Acısız', priceAdjustment:0},
                  {name: 'Pepsi', priceAdjustment: 10},
                  {name: 'Pepsi-Zero', priceAdjustment:10},
                  {name: 'Yedigün', priceAdjustment:10},
                  {name: '7Up', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Şeftali', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Limon', priceAdjustment:10},
                  {name: 'Lipton Ice Tea Mango', priceAdjustment:10},
                  {name: 'Tropicana Karışık', priceAdjustment:10},
                  {name: 'Tropicana Vişne', priceAdjustment:10},
                  {name: 'Tropicana Şeftali', priceAdjustment:10},
                  {name: 'Taze Sıkılmış Portakal Suyu', priceAdjustment:40},
                ],
                choiceType:'single', isMandatory:true,
              }
            ],
          }
        ]
      },
       {
        name: 'Yanlar',
        items: [
          {
            id: 'sb-y-1',
            name: 'Patates Kızartması',
            description: 'İsteğe Göre Baharatlı',
            price: 40,
            imageUrl: 'images/patates.jpg',
            category: 'Yanlar',
            optionCategories: [
              {
                name: 'Baharat Seçimi',
                options: [
                  { name: 'Baharatlı', priceAdjustment: 0 },
                  { name: 'Baharatsız', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
          {
            id: 'sb-y-2',
            name: 'Soğan Halkası',
            description: '6 adet',
            price: 40,
            imageUrl: 'images/sogan.jpg',
            category: 'Yanlar',
            optionCategories: [
              {
                name: 'Baharat Seçimi',
                options: [
                  { name: 'Baharatlı', priceAdjustment: 0 },
                  { name: 'Baharatsız', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
          {
            id: 'sb-y-3',
            name: 'Nugget',
            description: 'Kızarmış Nugget 6 adet',
            price: 50,
            imageUrl: 'images/nugget.jpg',
            category: 'Yanlar',
            optionCategories: [
              {
                name: 'Baharat Seçimi',
                options: [
                  { name: 'Baharatlı', priceAdjustment: 0 },
                  { name: 'Baharatsız', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
          {
            id: 'sb-y-4',
            name: 'Tavuk Topları',
            description: 'İsteğe Göre Tavuk Baharatı İle, 10 adet',
            price: 50,
            imageUrl: 'images/tavuk-topu.jpg',
            category: 'Yanlar',
            optionCategories: [
              {
                name: 'Baharat Seçimi',
                options: [
                  { name: 'Baharatlı', priceAdjustment: 0 },
                  { name: 'Baharatsız', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
          {
            id: 'sb-y-5',
            name: 'Mozzarella Sticks',
            description: 'Kızarmış Mozzarella Peyniri, 6 adet',
            price: 75,
            imageUrl: 'images/mozzarella.jpg',
            category: 'Yanlar',
            optionCategories: [
              {
                name: 'Baharat Seçimi',
                options: [
                  { name: 'Baharatlı', priceAdjustment: 0 },
                  { name: 'Baharatsız', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
              {
                name: 'Sos Seçimi',
                options: [
                  { name: 'Ketçap', priceAdjustment: 0 },
                  { name: 'Mayonez', priceAdjustment: 0 },
                  { name: 'Ranch', priceAdjustment: 0 },
                  { name: 'Barbekü', priceAdjustment: 0 },
                  { name: 'Özel Sos Tatlı', priceAdjustment: 0 },
                  { name: 'Hardal', priceAdjustment: 0 },
                  { name: 'Özel Sarımsaklı Sos', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          }
        ]
      },
      {
        name: 'İçecekler',
        items: [
           {
            id: 'sb-i-1',
            name: 'Taze Sıkılmış Portakal Suyu',
            description: 'Taptaze, Şişelenmiş Şekilde Servis Edilir',
            price: 75,
            imageUrl: 'images/portakal.jpg',
            category: 'İçecekler'
          },
           {
            id: 'sb-i-2',
            name: 'Pepsi',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/pepsi.jpg',
            category: 'İçecekler'
          },
           {
            id: 'sb-i-3',
            name: 'Pepsi Zero Sugar',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/pepsi-zero.jpg',
            category: 'İçecekler'
          },
           {
            id: 'sb-i-4',
            name: 'Yedigün',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/yedigun.jpg',
            category: 'İçecekler'
          },
           {
            id: 'sb-i-5',
            name: '7Up',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/7up.jpg',
            category: 'İçecekler'
          },
          {
            id: 'sb-i-6',
            name: 'Lipton Ice Tea',
            description: 'Limon - Şeftali - Mango ',
            price: 40,
            imageUrl: 'images/icetea.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Ice Tea Seçimi',
                options: [
                  { name: 'Limon', priceAdjustment: 0 },
                  { name: 'Şeftali', priceAdjustment: 0 },
                  {name: 'Mango', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              
            ],
          },
           {
            id: 'sb-i-7',
            name: 'Tropicana Meyve Suyu',
            description: 'Vişne - Karışık - Şeftali',
            price: 40,
            imageUrl: 'images/tropicana.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Tropicana Seçimi',
                options: [
                  { name: 'Vişne', priceAdjustment: 0 },
                  { name: 'Şeftali', priceAdjustment: 0 },
                  {name: 'Karışık', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
           {
            id: 'sb-i-8',
            name: 'Sek Ayran (28.5 cl)',
            description: 'Eker Ayran Büyük',
            price: 30,
            imageUrl: 'images/ayran.jpg',
            category: 'İçecekler'
          },
           {
            id: 'sb-i-9',
            name: 'Doğanay Gurme Şalgam',
            description: 'Acılı - Acısız',
            price: 20,
            imageUrl: 'images/doganay.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Acı Seçimi',
                options: [
                  { name: 'Acılı', priceAdjustment: 0 },
                  { name: 'Acısız', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
           {
            id: 'sb-i-10',
            name: 'Çay',
            description: 'Çeşitler İçin Personele Danışınız',
            price: 30,
            imageUrl: 'images/cay.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Çay Seçimi',
                options: [
                  { name: 'Earl Grey', priceAdjustment: 0 },
                  { name: 'Black Label', priceAdjustment: 0 },
                  { name: 'Yeşil Çay', priceAdjustment: 0 },
                  { name: 'Kuşburnu', priceAdjustment: 0 },
                  { name: 'Karışık Meyve', priceAdjustment: 0 },
                  { name: 'Detox', priceAdjustment: 0 },
                  { name: 'Kolajen', priceAdjustment: 0 },
                  { name: 'Enerji', priceAdjustment: 0 },
                  { name: 'Şeftali', priceAdjustment: 0 },
                  { name: 'Ananas', priceAdjustment: 0 },
                  { name: 'Mistik', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
        ]
      }
    ]
  },
  {
    id:'12',
    name:'SucuKöfte',
    logoUrl:'logos/sucukofte.jpg',
    categories:[
      {
        name:'Ekmek Arası',
        items:[
          {
            id:'sk-e-1',
            name: 'Yarım Ekmek Köfte',
            description: '150 gr. Köfte İstediğiniz Malzemeler (Domates, Soğan, Yeşil Biber, Kırmızı Biber İle',
            price: 150,
            imageUrl: 'images/kofte-ekmek.jpg',
            category: 'Ekmek Arası',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Domates', priceAdjustment: 0 },
                  {name: 'Marul', priceAdjustment:0},
                  {name: 'Turşu', priceAdjustment:0},
                  {name: 'Jalapeno', priceAdjustment:0},
                  {name: 'Yeşil Biber', priceAdjustment:0},
                  {name: 'Kırmızı Biber', priceAdjustment:0},
                ],
                choiceType: 'multi',isMandatory: true,
              },
            ],
          },
          {
            id:'sk-e-2',
            name: 'Yarım Ekmek Sucuk',
            description: '150 gr. Sucuk İstediğiniz Malzemeler (Domates, Soğan, Yeşil Biber, Kırmızı Biber İle',
            price: 150,
            imageUrl: 'images/sucuk-ekmek.jpg',
            category: 'Ekmek Arası',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Domates', priceAdjustment: 0 },
                  {name: 'Marul', priceAdjustment:0},
                  {name: 'Turşu', priceAdjustment:0},
                  {name: 'Jalapeno', priceAdjustment:0},
                  {name: 'Yeşil Biber', priceAdjustment:0},
                  {name: 'Kırmızı Biber', priceAdjustment:0},
                ],
                choiceType: 'multi',isMandatory: true,
              },
            ],
          }
        ]
      },
       {
        name:'Wrapler',
        items:[
          {
            id:'sk-w-1',
            name: 'Köfte Wrap',
            description: 'Tortilla Ekmeğinde 150 gr. Köfte İstediğiniz Malzemeler (Domates, Soğan, Yeşil Biber, Kırmızı Biber İle',
            price: 150,
            imageUrl: 'images/kofte-wrap.jpg',
            category: 'Wrapler',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Domates', priceAdjustment: 0 },
                  {name: 'Marul', priceAdjustment:0},
                  {name: 'Turşu', priceAdjustment:0},
                  {name: 'Jalapeno', priceAdjustment:0},
                  {name: 'Yeşil Biber', priceAdjustment:0},
                  {name: 'Kırmızı Biber', priceAdjustment:0},
                  {name: 'Maydonoz', priceAdjustment:0},
                  {name: 'Nane', priceAdjustment:0},
                  {name: 'Roka', priceAdjustment:0},
                ],
                choiceType: 'multi',isMandatory: true,
              },
            ],
          },
          {
            id:'sk-w-2',
            name: 'Sucuk Wrap',
            description: 'Tortilla Ekmeğinde 150 gr. Sucuk İstediğiniz Malzemeler (Domates, Soğan, Yeşil Biber, Kırmızı Biber İle',
            price: 150,
            imageUrl: 'images/sucuk-wrap.jpg',
            category: 'Wrapler',
            optionCategories: [
              {
                name: 'Malzeme Seçimi',
                options: [
                  { name: 'Domates', priceAdjustment: 0 },
                  {name: 'Marul', priceAdjustment:0},
                  {name: 'Havuç', priceAdjustment:0},
                  {name: 'Turşu', priceAdjustment:0},
                  {name: 'Jalapeno', priceAdjustment:0},
                  {name: 'Yeşil Biber', priceAdjustment:0},
                  {name: 'Kırmızı Biber', priceAdjustment:0},
                  {name: 'Maydonoz', priceAdjustment:0},
                  {name: 'Nane', priceAdjustment:0},
                  {name: 'Roka', priceAdjustment:0},
                ],
                choiceType: 'multi',isMandatory: true,
              },
            ],
          }
        ]
      },
      {
        name: 'Porsiyon',
        items:[
          {
            id:'sk-p-1',
            name: 'Köfte Porsiyon',
            description: '150 gr. Köfteve Pilav Yancılarıyla Servis Edilir ',
            price: 200,
            imageUrl: 'images/kofte-pors.jpg',
            category: 'Porsiyon'
          }
        ]
      },
      {
        name: 'İçecekler',
        items: [
           {
            id: 'sk-i-2',
            name: 'Pepsi',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/pepsi.jpg',
            category: 'İçecekler'
          },
           {
            id: 'sk-i-3',
            name: 'Pepsi Zero Sugar',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/pepsi-zero.jpg',
            category: 'İçecekler'
          },
           {
            id: 'sk-i-4',
            name: 'Yedigün',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/yedigun.jpg',
            category: 'İçecekler'
          },
           {
            id: 'sk-i-5',
            name: '7Up',
            description: '33lük Kutu',
            price: 40,
            imageUrl: 'images/7up.jpg',
            category: 'İçecekler'
          },
          {
            id: 'sk-i-6',
            name: 'Lipton Ice Tea',
            description: 'Limon - Şeftali - Mango ',
            price: 40,
            imageUrl: 'images/icetea.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Ice Tea Seçimi',
                options: [
                  { name: 'Limon', priceAdjustment: 0 },
                  { name: 'Şeftali', priceAdjustment: 0 },
                  {name: 'Mango', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
              
            ],
          },
           {
            id: 'sk-i-7',
            name: 'Tropicana Meyve Suyu',
            description: 'Vişne - Karışık - Şeftali',
            price: 40,
            imageUrl: 'images/tropicana.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Tropicana Seçimi',
                options: [
                  { name: 'Vişne', priceAdjustment: 0 },
                  { name: 'Şeftali', priceAdjustment: 0 },
                  {name: 'Karışık', priceAdjustment:0},
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
           {
            id: 'sk-i-8',
            name: 'Sek Ayran (28.5 cl)',
            description: 'Eker Ayran Büyük',
            price: 30,
            imageUrl: 'images/ayran.jpg',
            category: 'İçecekler'
          },
           {
            id: 'sk-i-9',
            name: 'Doğanay Gurme Şalgam',
            description: 'Acılı - Acısız',
            price: 20,
            imageUrl: 'images/doganay.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Acı Seçimi',
                options: [
                  { name: 'Acılı', priceAdjustment: 0 },
                  { name: 'Acısız', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
           {
            id: 'sk-i-10',
            name: 'Çay',
            description: 'Çeşitler İçin Personele Danışınız',
            price: 30,
            imageUrl: 'images/cay.jpg',
            category: 'İçecekler',
            optionCategories: [
              {
                name: 'Çay Seçimi',
                options: [
                  { name: 'Earl Grey', priceAdjustment: 0 },
                  { name: 'Black Label', priceAdjustment: 0 },
                  { name: 'Yeşil Çay', priceAdjustment: 0 },
                  { name: 'Kuşburnu', priceAdjustment: 0 },
                  { name: 'Karışık Meyve', priceAdjustment: 0 },
                  { name: 'Detox', priceAdjustment: 0 },
                  { name: 'Kolajen', priceAdjustment: 0 },
                  { name: 'Enerji', priceAdjustment: 0 },
                  { name: 'Şeftali', priceAdjustment: 0 },
                  { name: 'Ananas', priceAdjustment: 0 },
                  { name: 'Mistik', priceAdjustment: 0 },
                ],
                choiceType: 'single',isMandatory: true,
              },
            ],
          },
        ]
      }
    ]
  },
  {
    id:'13',
    name:'Misu Tiramisu',
    logoUrl:'logos/misu.jpg',
    categories:[
      {
        name:'Tiramisular',
        items:[
          {
            id:'mt-t-1',
            name: 'Tiramisu Porsiyon',
            description: 'Taptaze Misu Tiramisu',
            price: 100,
            imageUrl: 'images/tiramisu.jpg',
            category: 'Tiramisular',
          },
          {
            id:'mt-t-2',
            name: 'Dev Misu Tiramisu (3 Kişilik)',
            description: 'Kocaman Misu Tiramisu',
            price: 400,
            imageUrl: 'images/tiramisu.jpg',
            category: 'Tiramisular',
          }
        ]
      },
       {
        name:'Pastalar',
        items:[
          {
            id:'mt-p-1',
            name: 'Lotus Cheesecake',
            description: 'Taptaze Lotus Bisküvili Cheesecake',
            price: 200,
            imageUrl: 'images/lotus.jpg',
            category: 'Pastalar',
          },
          {
            id:'mt-p-2',
            name: 'Frambuazlı Çikolatalı Pasta',
            description: 'Frambuazla Çikolatanın Enfes Uyumu',
            price: 200,
            imageUrl: 'images/frambuaz.jpg',
            category: 'Pastalar',
          },
          {
            id:'mt-p-3',
            name: 'Dubai Çikolatalı Brownie',
            description: 'Enfes Antep Fıstıklı Dubai Çikolatasıyla Brownienin Muhteşem Uyumu',
            price: 300,
            imageUrl: 'images/dubai.jpg',
            category: 'Pastalar',
          },
          {
            id:'mt-p-4',
            name: 'Devils Fudge',
            description: 'Çikolata Aşıkları İçin Birebir',
            price: 200,
            imageUrl: 'images/devils.jpg',
            category: 'Pastalar',
          },
          {
            id:'mt-p-5',
            name: 'Speculoos Dome',
            description: 'Speculoos Bisküvili, Muzlu Kremalı Enfes Tatlımız',
            price: 200,
            imageUrl: 'images/spek.jpg',
            category: 'Pastalar',
          },
          {
            id:'mt-p-6',
            name: 'Çikolatalı Marlenka',
            description: 'Çeklerin Enfes Bal Tatlısı',
            price: 175,
            imageUrl: 'images/marlenka.jpg',
            category: 'Pastalar',
          },
          {
            id:'mt-p-7',
            name: 'Mochalı Ekler',
            description: 'Fransız Ekleri, İtalyan Mochası Enfes Uyum',
            price: 200,
            imageUrl: 'images/mocha.jpg',
            category: 'Pastalar',
          },
          {
            id:'mt-p-8',
            name: 'Çilekli Yaz Ekleri',
            description: 'Taptaze Çilekler, Kadifemsi Krema ve Fransız Ekleri',
            price: 200,
            imageUrl: 'images/ekler.jpg',
            category: 'Pastalar',
          },
          {
            id:'mt-p-9',
            name: 'Havuçlu Cevizli Kek',
            description: 'Anne İşi, Hafif, Sağlıklı ve Muazzam',
            price: 100,
            imageUrl: 'images/havcev.jpg',
            category: 'Pastalar',
          },
          {
            id:'mt-p-10',
            name: 'Vişneli Çikolatalı Kek',
            description: 'Vişnelerin Çikolatayla Enfes Buluşması',
            price: 100,
            imageUrl: 'images/visne-cikolata.jpg',
            category: 'Pastalar',
          }, 
        ]
      },
      {
        name: 'Donutlar',
        items:[
          {
            id:'mt-d-1',
            name: 'Kitkatlı Berliner',
            description: 'Enfes KitKat Çikolatası, Çikolatalı Berliner İç Dolgusu',
            price: 150,
            imageUrl: 'images/kitkat.jpg',
            category: 'Donutlar'
          },
          {
            id:'mt-d-2',
            name: 'Kayısılı Berliner',
            description: 'Enfes Kayısılı İç Dolgulu Berliner Donut',
            price: 120,
            imageUrl: 'images/kayısı.jpg',
            category: 'Donutlar'
          }
        ]
      }
      
    ]
  }
    ];
  
export function getRestaurantCategories(restaurantName: string): string[] {
  const restaurant = restaurantMenus.find(r => r.name === restaurantName);
  return restaurant ? restaurant.categories.map(cat => cat.name) : [];
}