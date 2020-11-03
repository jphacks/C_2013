import argparse

from tools.detect import detect

models = {'helen': './learned-models/helen-dataset.dat',
          '300w': './learned-models/300w-dataset.dat'}
cascade_models = {
    'frontal': './haarcascades/haarcascade_frontalface_default.xml'}


def parse_args():
    parser = argparse.ArgumentParser(description='Detect facial landmarks')

    parser.add_argument('--img_path', default='./img/1.jpg', help='path to detected image')
    parser.add_argument('--model', default='300w', help='select facemark model [helen/300w] (default:300w')
    parser.add_argument('--cascade', default='frontal', help='select cascade model [frontal] (default:frontal')
    parser.add_argument('--mode', default='image', help='select mode image/video')

    args = parser.parse_args()

    return args


def main():
    args = parse_args()

    if args.mode == 'video':
        detect(cascade_models[args.cascade],
               models[args.model]).draw_landmarks_video()

    else:
        detect(cascade_models[args.cascade], models[args.model]
               ).draw_landmarks_img(args.img_path)


if __name__ == '__main__':
    main()
